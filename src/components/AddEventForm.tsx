import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import Button from '../shared/semantic/Button';
import Input from '../shared/semantic/Input';
import Textarea from '../shared/semantic/Textarea';
import Checkbox from '../shared/semantic/Checkbox';
import Dropdown from '../shared/semantic/Dropdown';
import Flex from '../shared/semantic/Flex';
import Card from '../shared/semantic/Card';
import Heading from '../shared/semantic/Heading';
import SectionSubheader from '../shared/semantic/SectionSubheader';
import type { Event, EventFormData, RecurringDetails } from '../shared/types';

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
    recurringDetails: undefined,
    photoURLs: []
  });
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isEditMode = eventToEdit !== null;

  // Location options for dropdown
  const locationOptions = [
    { label: 'Select location', value: '' },
    { label: 'Sanctuary', value: 'Sanctuary' },
    { label: 'Fellowship Hall', value: 'Fellowship Hall' },
    { label: 'Library', value: 'Library' },
  ];

  // Category options for dropdown
  const categoryOptions = [
    { label: 'Select category', value: '' },
    { label: 'Worship Service', value: 'Worship Service' },
    { label: 'Bible Study', value: 'Bible Study' },
    { label: 'Prayer Meeting', value: 'Prayer Meeting' },
    { label: 'Fellowship', value: 'Fellowship' },
    { label: 'Ministry', value: 'Ministry' },
    { label: 'Youth', value: 'Youth' },
    { label: 'Children', value: 'Children' },
    { label: 'Outreach', value: 'Outreach' },
    { label: 'Special Event', value: 'Special Event' },
    { label: 'Conference', value: 'Conference' },
  ];

  // Recurring frequency options
  const frequencyOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Custom', value: 'custom' },
  ];

  // End type options
  const endTypeOptions = [
    { label: 'Never ends', value: 'never' },
    { label: 'After number of occurrences', value: 'after' },
    { label: 'Until specific date', value: 'until' },
  ];

  // Monthly type options
  const monthlyTypeOptions = [
    { label: 'Same date each month', value: 'date' },
    { label: 'Same day of week each month', value: 'day' },
  ];

  // Populate form when an event is selected for editing
  useEffect(() => {
    if (isEditMode) {
      setFormData(eventToEdit);
      setMessage(null);
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
        recurringDetails: undefined,
        photoURLs: []
      });
      setMessage(null);
    }
  }, [eventToEdit, isEditMode]);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear message when user starts typing
    if (message) {
      setMessage(null);
    }
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: EventFormData) => {
        const newData = { ...prev, [name]: checked };
        
        // Reset recurring details if unchecking recurring
        if (name === 'recurring' && !checked) {
          newData.recurringDetails = undefined;
        }
        
        // Initialize recurring details if checking recurring
        if (name === 'recurring' && checked && !prev.recurringDetails) {
          newData.recurringDetails = {
            frequency: 'weekly',
            interval: 1,
            endType: 'never',
          };
        }
        
        return newData;
      });
    } else {
      setFormData((prev: EventFormData) => ({ ...prev, [name]: value }));
    }
  };

  const handleRecurringChange = (field: keyof RecurringDetails, value: any) => {
    setFormData((prev: EventFormData) => ({
      ...prev,
      recurringDetails: {
        ...prev.recurringDetails!,
        [field]: value,
      },
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Please enter an event title.' });
      return false;
    }
    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a description.' });
      return false;
    }
    if (!formData.date) {
      setMessage({ type: 'error', text: 'Please select a date.' });
      return false;
    }
    if (!formData.startTime) {
      setMessage({ type: 'error', text: 'Please select a start time.' });
      return false;
    }
    if (!formData.endTime) {
      setMessage({ type: 'error', text: 'Please select an end time.' });
      return false;
    }
    if (formData.startTime >= formData.endTime) {
      setMessage({ type: 'error', text: 'End time must be after start time.' });
      return false;
    }
    if (!formData.location) {
      setMessage({ type: 'error', text: 'Please select a location.' });
      return false;
    }
    if (!formData.category) {
      setMessage({ type: 'error', text: 'Please select a category.' });
      return false;
    }
    
    // Validate recurring details if recurring is enabled
    if (formData.recurring && formData.recurringDetails) {
      const { endType, endAfter, endDate } = formData.recurringDetails;
      
      if (endType === 'after' && (!endAfter || endAfter < 1)) {
        setMessage({ type: 'error', text: 'Please specify number of occurrences.' });
        return false;
      }
      
      if (endType === 'until' && !endDate) {
        setMessage({ type: 'error', text: 'Please select an end date.' });
        return false;
      }
    }
    
    return true;
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
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage(null);

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
        setMessage({ type: 'success', text: 'Event updated successfully!' });

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
        setMessage({ type: 'success', text: 'Event added successfully!' });
      }

      // Reset form and parent state
      onFormSubmit();
      setPhotos(null);

    } catch (error) {
      console.error('Error saving event:', error);
      setMessage({ type: 'error', text: 'Failed to save event. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-none">
      <Heading as="h3" variant="section" className="mb-4">
        {isEditMode ? 'Edit Event' : 'Add New Event'}
      </Heading>
      
      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Information Section */}
        <div className="space-y-3">
          <SectionSubheader className="text-text-primary text-sm font-semibold">
            Basic Information
          </SectionSubheader>
          
          <Input
            type="text"
            name="title"
            label="Event Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter event title"
          />
          
          <Textarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            placeholder="Describe your event..."
          />
        </div>

        {/* Date & Time Section */}
        <div className="space-y-3">
          <SectionSubheader className="text-text-primary text-sm font-semibold">
            Date & Time
          </SectionSubheader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
        </div>

        {/* Location & Category Section */}
        <div className="space-y-3">
          <SectionSubheader className="text-text-primary text-sm font-semibold">
            Location & Category
          </SectionSubheader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleInputChange}
              options={locationOptions}
              required
            />
            <Dropdown
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleInputChange}
              options={categoryOptions}
              required
            />
          </div>
        </div>

        {/* Additional Options Section */}
        <div className="space-y-3">
          <SectionSubheader className="text-text-primary text-sm font-semibold">
            Additional Options
          </SectionSubheader>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-primary">
                Add Photos
              </label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handlePhotoChange} 
                className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-secondary text-text-primary text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-light file:text-primary-dark hover:file:bg-primary-ultralight transition-colors"
              />
              {photos && photos.length > 0 && (
                <p className="text-xs text-text-secondary mt-1">
                  {photos.length} photo(s) selected
                </p>
              )}
            </div>
            
            <Checkbox 
              label="Recurring Event" 
              name="recurring" 
              checked={formData.recurring} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Recurring Details Section - Only show if recurring is checked */}
        {formData.recurring && (
          <div className="space-y-3">
            <SectionSubheader className="text-text-primary text-sm font-semibold">
              Recurring Details
            </SectionSubheader>
            
            <div className="space-y-3 bg-bg-section p-4 rounded-lg border border-border-primary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">
                    Frequency
                  </label>
                  <select 
                    value={formData.recurringDetails?.frequency || 'weekly'} 
                    onChange={(e) => handleRecurringChange('frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-secondary text-text-primary text-sm"
                  >
                    {frequencyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Input
                  type="number"
                  label="Repeat Every"
                  value={formData.recurringDetails?.interval || 1}
                  onChange={(e) => handleRecurringChange('interval', parseInt(e.target.value))}
                  min="1"
                  className="text-sm"
                />
              </div>

              {formData.recurringDetails?.frequency === 'monthly' && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">
                    Monthly Pattern
                  </label>
                  <select 
                    value={formData.recurringDetails?.monthlyType || 'date'} 
                    onChange={(e) => handleRecurringChange('monthlyType', e.target.value)}
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-secondary text-text-primary text-sm"
                  >
                    {monthlyTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">
                  End Condition
                </label>
                <select 
                  value={formData.recurringDetails?.endType || 'never'} 
                  onChange={(e) => handleRecurringChange('endType', e.target.value)}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-bg-secondary text-text-primary text-sm"
                >
                  {endTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.recurringDetails?.endType === 'after' && (
                <Input
                  type="number"
                  label="Number of Occurrences"
                  value={formData.recurringDetails?.endAfter || ''}
                  onChange={(e) => handleRecurringChange('endAfter', parseInt(e.target.value))}
                  min="1"
                  className="text-sm"
                />
              )}

              {formData.recurringDetails?.endType === 'until' && (
                <Input
                  type="date"
                  label="End Date"
                  value={formData.recurringDetails?.endDate || ''}
                  onChange={(e) => handleRecurringChange('endDate', e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-border-primary">
          <Flex direction="row" gap={3}>
            <Button 
              type="submit" 
              disabled={loading} 
              className="flex-1 py-2 font-medium"
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Event' : 'Add Event')}
            </Button>
            {isEditMode && (
              <Button 
                variant="outline" 
                onClick={onFormSubmit} 
                className="flex-1 py-2 font-medium"
              >
                Cancel Edit
              </Button>
            )}
          </Flex>
        </div>
      </form>
    </Card>
  );
};

export default AddEventForm;