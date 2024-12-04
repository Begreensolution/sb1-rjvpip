import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Practice } from '../types';
import {
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';

interface PracticeTimelineProps {
  timeline: Practice['timeline'];
}

export function PracticeTimeline({ timeline }: PracticeTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'status_change':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'attachment':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'assignment':
        return <UserPlus className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                    {getIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <span className="font-medium text-gray-900">
                        {event.user.name}
                      </span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(new Date(event.timestamp), "d MMMM yyyy 'alle' HH:mm", {
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