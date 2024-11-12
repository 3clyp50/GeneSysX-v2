import React from 'react';
import { format } from 'date-fns';

interface Publication {
  title: string;
  journal: string;
  date: Date;
  doi?: string;
  authors: string[];
}

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  return (
    <div className="bg-white dark:bg-gray-800 px-4 py-5 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {publication.title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {format(publication.date, 'MMM d, yyyy')}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {publication.authors.join(', ')}
        </p>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {publication.journal}
          </span>
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              DOI: {publication.doi}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;