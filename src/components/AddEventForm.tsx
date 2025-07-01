import React, { useState } from 'react';
import Button from '../shared/semantic/Button';
import Input from '../shared/semantic/Input';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [photos, setPhotos] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create the event document in Firestore first to get an ID
      const eventDocRef = await addDoc(collection(db, 'events'), {
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        category,
        recurring,
        photoURLs: [], // Initialize with an empty array
      });

      const eventId = eventDocRef.id;
      const photoURLs: string[] = [];

      // 2. Upload photos if they exist
      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          // Use the eventId to create a structured path
          const storageRef = ref(storage, `events/${eventId}/${photo.name}`);
          try {
            await uploadBytes(storageRef, photo);
            const photoURL = await getDownloadURL(storageRef);
            photoURLs.push(photoURL);
          } catch (uploadError) {
            console.error(`Failed to upload ${photo.name}:`, uploadError);
            alert(`Failed to upload ${photo.name}. Please try again.`);
            // Optional: Delete the created event if photo upload fails
            // await deleteDoc(eventDocRef);
            return; // Stop if any upload fails
          }
        }
      }

      // 3. Update the event document with the photo URLs
      await updateDoc(eventDocRef, {
        photoURLs,
      });

      alert('Event added successfully!');
      // Reset form...
    } catch (error) {
      console.error('Error adding event: ', error);
      alert('Failed to add event.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        label="Start Time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <Input
        label="End Time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <Input
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <Input
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <Input
        label="Photos"
        type="file"
        onChange={(e) => setPhotos(e.target.files)}
        multiple
      />
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="mr-2"
          />
          Recurring Event
        </label>
      </div>
      <Button type="submit">Add Event</Button>
    </form>
  );
};

export default AddEventForm;
