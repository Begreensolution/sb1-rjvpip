```tsx
import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { FileText, MessageSquare, User, Clock } from 'lucide-react';

interface HistoryEvent {
  id: string;
  type: 'document' | 'message' | 'practice' | 'status';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    id: string;
    name: string;
  };
  metadata?: Record<string, any>;
}

interface ClientHistoryProps {
  events: HistoryEvent[];
}

export function ClientHistory({ events }: ClientHistoryProps) {
  const getEventIcon = (type: HistoryEvent['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'practice':
        return <Clock className="h-5 w-5 text-purple-500" />;
      case 'status':
        return <User className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <div className="flow-root">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Cronologia</h2>
      
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900">
                      {event.title}{' '}
                      <span className="font-medium text-gray-700">
                        {event.user.name}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {event.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(event.timestamp, "d MMMM yyyy 'alle' HH:mm", {
                      locale: it,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```