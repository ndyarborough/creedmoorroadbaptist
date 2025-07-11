import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import Button from '../shared/semantic/Button';
import Input from '../shared/semantic/Input';
import Checkbox from '../shared/semantic/Checkbox';
import Flex from '../shared/semantic/Flex';
import Card from '../shared/semantic/Card';
import Heading from '../shared/semantic/Heading';
import Textarea from '../shared/semantic/Textarea';

interface Group {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  recurring: boolean;
  photoURLs: string[];
}

const AddGroupForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Group, 'id'>>({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const uploadPhotos = async (files: FileList): Promise<string[]> => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `groups/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    });
    
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURLs: string[] = [];
      
      if (photos && photos.length > 0) {
        photoURLs = await uploadPhotos(photos);
      }

      const groupData = {
        ...formData,
        photoURLs
      };

      await addDoc(collection(db, 'groups'), groupData);
      
      // Reset form
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
      setPhotos(null);
      
      alert('Group added successfully!');
    } catch (error) {
      console.error('Error adding group:', error);
      alert('Failed to add group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <Heading as="h3" variant="section-subheader" className="mb-4">
        Add New Group
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Flex direction="col" gap={4}>
          {/* Title */}
          <Input
            type="text"
            name="title"
            label="Group Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter group title"
          />

          {/* Description */}
          <Textarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Enter group description"
            rows={4}
          />

          {/* Date and Time Row */}
          <Flex direction="row" gap={4}>
            <Input
              type="date"
              name="date"
              label="Date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            
            <Input
              type="time"
              name="startTime"
              label="Start Time"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
            
            <Input
              type="time"
              name="endTime"
              label="End Time"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
          </Flex>

          {/* Location and Category Row */}
          <Flex direction="row" gap={4}>
            <Input
              type="text"
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Enter location"
            />
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="Bible Study">Bible Study</option>
                <option value="Prayer Group">Prayer Group</option>
                <option value="Fellowship">Fellowship</option>
                <option value="Ministry">Ministry</option>
                <option value="Youth">Youth</option>
                <option value="Children">Children</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Seniors">Seniors</option>
                <option value="Small Group">Small Group</option>
              </select>
            </div>
          </Flex>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos (Optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can select multiple photos for this group
            </p>
          </div>

          {/* Recurring Checkbox */}
          <Flex direction="row" items="center" gap={2}>
            <Checkbox
              label='Recurring'
              name="recurring"
              checked={formData.recurring}
              onChange={handleInputChange}
            />
            <label className="text-sm font-medium text-gray-700">
              This is a recurring group
            </label>
          </Flex>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Adding Group...' : 'Add Group'}
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

export default AddGroupForm;