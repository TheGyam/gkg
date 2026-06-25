import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, FileText, Image as ImageIcon } from 'lucide-react';
import './FileUpload.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function getFileIcon(type) {
  if (type.startsWith('image/')) return <ImageIcon size={20} />;
  if (type.includes('pdf')) return <FileText size={20} />;
  return <File size={20} />;
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function FileUpload({ files, onFilesChange, maxFiles = 5 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, [files, maxFiles]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileInput = (e) => {
    setError(null);
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
    // Reset input so the same file can be selected again if removed
    if (inputRef.current) inputRef.current.value = '';
  };

  const processFiles = (newFiles) => {
    const validFiles = [];
    let errorMessage = null;

    if (files.length + newFiles.length > maxFiles) {
      errorMessage = `You can only upload up to ${maxFiles} documents.`;
    } else {
      for (const file of newFiles) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          errorMessage = `File type not supported: ${file.name}. Please upload PDF, Word, or Images.`;
          break;
        }
        if (file.size > MAX_FILE_SIZE) {
          errorMessage = `File too large: ${file.name}. Max size is 10MB.`;
          break;
        }
        // Avoid duplicates by name + size
        if (!files.some((f) => f.name === file.name && f.size === file.size)) {
          validFiles.push(file);
        }
      }
    }

    if (errorMessage) {
      setError(errorMessage);
    } else if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="file-upload">
      <div
        className={`file-upload__dropzone ${isDragging ? 'file-upload__dropzone--active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileInput}
          multiple
          accept={ALLOWED_TYPES.join(',')}
          className="sr-only"
        />
        <motion.div 
          className="file-upload__icon-wrapper"
          animate={{ y: isDragging ? -5 : 0 }}
        >
          <UploadCloud size={32} />
        </motion.div>
        <h4 className="file-upload__title font-display">Drag & Drop Documents Here</h4>
        <p className="file-upload__subtitle">or click to browse from your device</p>
        <p className="file-upload__hint">Accepted: PDF, Word (DOCX), JPEG, PNG. Max 10MB per file.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="file-upload__error"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="file-upload__list">
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="file-upload__item"
            >
              <div className="file-upload__item-icon">
                {getFileIcon(file.type)}
              </div>
              <div className="file-upload__item-info">
                <span className="file-upload__item-name" title={file.name}>
                  {file.name}
                </span>
                <span className="file-upload__item-size">{formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                className="file-upload__item-remove"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
