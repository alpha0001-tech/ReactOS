import React, { useState } from 'react';
import { Edit3, Trash2, List } from 'lucide-react';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: "Meeting at 2 PM\n- Discuss project roadmap\n- Assign tasks", date: "Today" },
    { id: 2, text: "Grocery List:\n- Milk\n- Eggs\n- Bread", date: "Yesterday" }
  ]);
  const [activeNote, setActiveNote] = useState(0);

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar List */}
      <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-200 text-center font-semibold text-gray-600">
            All iCloud
        </div>
        <div className="flex-1 overflow-y-auto">
            {notes.map((note, idx) => (
                <div 
                    key={note.id}
                    onClick={() => setActiveNote(idx)}
                    className={`p-3 border-b border-gray-100 cursor-pointer ${activeNote === idx ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}
                >
                    <div className="font-bold text-gray-800 text-sm truncate">{note.text.split('\n')[0]}</div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                        <span>{note.date}</span>
                        <span>No additional text</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white">
          <div className="h-10 border-b border-gray-100 flex items-center justify-between px-4 text-gray-400">
              <span className="text-xs">Edited just now</span>
              <div className="flex space-x-3">
                  <Trash2 size={16} className="cursor-pointer hover:text-red-500" />
                  <Edit3 size={16} className="cursor-pointer hover:text-yellow-500" />
              </div>
          </div>
          <textarea 
            className="flex-1 p-6 focus:outline-none resize-none text-gray-800 text-lg leading-relaxed font-serif"
            value={notes[activeNote]?.text || ''}
            onChange={(e) => {
                const newNotes = [...notes];
                newNotes[activeNote].text = e.target.value;
                setNotes(newNotes);
            }}
          />
      </div>
    </div>
  );
};

export default Notes;