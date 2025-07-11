import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import GroupCard from "./GroupCard";
import Button from "../shared/semantic/Button";
import Heading from "../shared/semantic/Heading";

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

interface GroupGroup {
  title: string;
  groups: Group[];
}

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupedGroups, setGroupedGroups] = useState<GroupGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const grouped = groupGroupsByTimeFrame(groups);
      setGroupedGroups(grouped);
    } else {
      setGroupedGroups([]);
    }
  }, [groups]);

  const fetchGroups = async () => {
    try {
      const groupsCollection = await getDocs(collection(db, "groups"));
      const groupsData = groupsCollection.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      })) as Group[];
      
      // Sort groups by date
      const sortedGroups = groupsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setGroups(sortedGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupGroupsByTimeFrame = (groups: Group[]): GroupGroup[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get start and end of current week (Sunday to Saturday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const nextWeekStart = new Date(endOfWeek);
    nextWeekStart.setDate(endOfWeek.getDate() + 1);

    const todayGroups: Group[] = [];
    const thisWeekGroups: Group[] = [];
    const nextWeekAndBeyondGroups: Group[] = [];

    groups.forEach(group => {
      const groupDate = new Date(group.date);
      const groupDateOnly = new Date(groupDate.getFullYear(), groupDate.getMonth(), groupDate.getDate());

      if (groupDateOnly.getTime() === today.getTime()) {
        todayGroups.push(group);
      } else if (groupDateOnly >= startOfWeek && groupDateOnly <= endOfWeek) {
        thisWeekGroups.push(group);
      } else if (groupDateOnly > endOfWeek) {
        nextWeekAndBeyondGroups.push(group);
      }
    });

    const groupGroups: GroupGroup[] = [];

    // Today's groups
    if (todayGroups.length > 0) {
      const todayTitle = `Today - ${formatDateHeader(today)}`;
      groupGroups.push({ title: todayTitle, groups: todayGroups });
    }

    // This week's groups (excluding today)
    if (thisWeekGroups.length > 0) {
      groupGroups.push({ title: "This Week", groups: thisWeekGroups });
    }

    // Next week and beyond
    if (nextWeekAndBeyondGroups.length > 0) {
      groupGroups.push({ title: "Next Week & Beyond", groups: nextWeekAndBeyondGroups });
    }

    return groupGroups;
  };

  const formatDateHeader = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteDoc(doc(db, "groups", groupId));
        // Refresh the groups list
        fetchGroups();
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Failed to delete group. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">Loading groups...</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-500 mb-4">No groups found.</p>
        <p className="text-sm text-gray-400">Add your first group using the form above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groupedGroups.map((group, index) => (
        <div key={index} className="space-y-4">
          {/* Group Header */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <Heading as="h3" variant="section-subheader" className="text-gray-700 font-semibold">
              {group.title}
            </Heading>
          </div>
          
          {/* Group Groups */}
          <div className="space-y-4 ml-1 lg:ml-7">
            {group.groups.map(groupItem => (
              <div key={groupItem.id} className="relative">
                <GroupCard group={groupItem} />
                {/* Delete button - only show in admin view */}
                <Button
                  onClick={() => handleDeleteGroup(groupItem.id)}
                  variant="danger"
                  className="absolute top-2 right-2 text-xs px-2 py-1"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;