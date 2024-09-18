import React from "react";

const ExternalLinks: React.FC = () => {
  return (
    <div className="sidebar bg-light p-3 shadow-sm">
      <h4>External Links</h4>
      <ul>
        <li>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example Link 1
          </a>
        </li>
        <li>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example Link 2
          </a>
        </li>
        <li>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example Link 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExternalLinks;
