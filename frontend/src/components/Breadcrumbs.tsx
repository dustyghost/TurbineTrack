import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTurbine } from '../api/turbineAPI';
import { breadcrumbLabels } from './BreadcrumbMap';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const [turbineName, setTurbineName] = useState<string | null>(null);

  useEffect(() => {
    const loadTurbineName = async () => {
      const turbineIdIndex = segments.findIndex(s => /^\d+$/.test(s));
      const isTurbineDetail = segments[turbineIdIndex - 1] === 'turbines';

      if (isTurbineDetail) {
        const turbineId = segments[turbineIdIndex];
        try {
          const data = await getTurbine(Number(turbineId));
          setTurbineName(data.location);
        } catch {
          setTurbineName(null);
        }
      }
    };

    loadTurbineName();
  }, [location.pathname]);

  const crumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');

    // Special case: replace turbine ID with its name
    if (turbineName && /^\d+$/.test(segment) && segments[index - 1] === 'turbines') {
      return (
        <span key={path} className="text-sm text-gray-600">
          {' / '}
          <Link to={path} className="text-blue-500 hover:underline">
            {turbineName}
          </Link>
        </span>
      );
    }

    const label = breadcrumbLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    return (
      <span key={path} className="text-sm text-gray-600">
        {' / '}
        <Link to={path} className="text-blue-500 hover:underline">
          {label}
        </Link>
      </span>
    );
  });

  return (
    <nav className="text-sm mb-4">
      <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      {crumbs}
    </nav>
  );
};

export default Breadcrumbs;
