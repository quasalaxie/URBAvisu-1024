import { FaDesktop, FaClosedCaptioning, FaDolby, FaCheck } from 'react-icons/fa';

const TechnicalSpecs = ({ specs }) => {
  return (
    <div className="bg-gray-850 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6">Technical Specs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Video</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <FaDesktop className="mr-2 text-primary" />
              Resolution: {specs?.resolution || '4K (3840x2160)'}
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheck className="mr-2 text-primary" />
              HDR: {specs?.hdr || 'Dolby Vision, HDR10'}
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheck className="mr-2 text-primary" />
              Frame Rate: {specs?.frameRate || '24p'}
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Audio</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <FaDolby className="mr-2 text-primary" />
              {specs?.audio || 'Dolby Atmos'}
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheck className="mr-2 text-primary" />
              5.1 Surround Sound
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Subtitles</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <FaClosedCaptioning className="mr-2 text-primary" />
              Multiple Languages
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheck className="mr-2 text-primary" />
              SDH (Subtitles for the Deaf and Hard of Hearing)
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Accessibility</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <FaCheck className="mr-2 text-primary" />
              Audio Description Available
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheck className="mr-2 text-primary" />
              Closed Captions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecs;