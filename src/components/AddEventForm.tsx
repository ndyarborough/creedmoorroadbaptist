import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import Button from '../shared/semantic/Button';
import Input from '../shared/semantic/Input';
import Textarea from '../shared/semantic/Textarea';
import Checkbox from '../shared/semantic/Checkbox';
import Flex from '../shared/semantic/Flex';
import Card from '../shared/semantic/Card';
import Heading from '../shared/semantic/Heading';
import type { Event, EventFormData } from '../shared/types';

interface AddEventFormProps {
  eventToEdit: Event | null;
  onFormSubmit: () => void; // Callback to reset the parent state
}

const AddEventForm: React.FC<AddEventFormProps> = ({ eventToEdit, onFormSubmit }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: '',
    recurring: false,
    photoURLs: []
  });
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditMode = eventToEdit !== null;

  // Populate form when an event is selected for editing
  useEffect(() => {
    if (isEditMode) {
      setFormData(eventToEdit);
    } else {
      // Reset form if eventToEdit is null (e.g., after an edit is completed)
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        category: '',
        recurring: false,
        photoURLs: []
      });
    }
  }, [eventToEdit, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: EventFormData) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: EventFormData) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const uploadPhotos = async (files: FileList, eventId: string): Promise<string[]> => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `events/${eventId}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalPhotoURLs = formData.photoURLs || [];

      if (isEditMode) {
        // UPDATE LOGIC
        const eventId = eventToEdit.id;
        if (photos && photos.length > 0) {
          const newPhotoURLs = await uploadPhotos(photos, eventId);
          finalPhotoURLs = [...finalPhotoURLs, ...newPhotoURLs];
        }
        
        const eventDocRef = doc(db, 'events', eventId);
        await updateDoc(eventDocRef, {
          ...formData,
          photoURLs: finalPhotoURLs,
        });
        alert('Event updated successfully!');

      } else {
        // CREATE LOGIC
        const eventDocRef = await addDoc(collection(db, 'events'), {
          ...formData,
          photoURLs: [], // Initialize empty
        });

        const eventId = eventDocRef.id;
        if (photos && photos.length > 0) {
          finalPhotoURLs = await uploadPhotos(photos, eventId);
          await updateDoc(eventDocRef, { photoURLs: finalPhotoURLs });
        }
        alert('Event added successfully!');
      }

      // Reset form and parent state
      onFormSubmit();
      setPhotos(null);

    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <Heading as="h3" variant="section-subheader" className="mb-4">
        {isEditMode ? 'Edit Event' : 'Add New Event'}
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Flex direction="col" gap={4}>
          <Input
            type="text"
            name="title"
            label="Event Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <Textarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
          />
          <Flex direction="row" gap={4}>
            <Input type="date" name="date" label="Date" value={formData.date} onChange={handleInputChange} required />
            <Input type="time" name="startTime" label="Start Time" value={formData.startTime} onChange={handleInputChange} required />
            <Input type="time" name="endTime" label="End Time" value={formData.endTime} onChange={handleInputChange} required />
          </Flex>
          <Flex direction="row" gap={4}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select name="location" value={formData.location} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select location</option>
                <option value="Sanctuary">Sanctuary</option>
                <option value="Fellowship Hall">Fellowship Hall</option>
                <option value="Library">Library</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select category</option>
                <option value="Worship Service">Worship Service</option>
                <option value="Bible Study">Bible Study</option>
                <option value="Prayer Meeting">Prayer Meeting</option>
                <option value="Fellowship">Fellowship</option>
                <option value="Ministry">Ministry</option>
                <option value="Youth">Youth</option>
                <option value="Children">Children</option>
                <option value="Outreach">Outreach</option>
                <option value="Special Event">Special Event</option>
                <option value="Conference">Conference</option>
              </select>
            </div>
          </Flex>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Photos</label>
            <input type="file" multiple accept="image/*" onChange={handlePhotoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <Flex direction="row" items="center" gap={2}>
            <Checkbox label='Recurring' name="recurring" checked={formData.recurring} onChange={handleInputChange} />
          </Flex>
          <Flex direction="row" gap={4}>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : (isEditMode ? 'Update Event' : 'Add Event')}
            </Button>
            {isEditMode && (
              <Button variant="outline" onClick={onFormSubmit} className="flex-1">
                Cancel Edit
              </Button>
            )}
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default AddEventForm;