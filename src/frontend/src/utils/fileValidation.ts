export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

// IC practical limits - conservative to ensure reliability
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
];

const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export function validateVideoFile(file: File): FileValidationResult {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid video format. Please upload MP4, WebM, OGG, or MOV files.`,
    };
  }

  if (file.size > MAX_VIDEO_SIZE) {
    return {
      valid: false,
      error: `Video file is too large. Maximum size is ${formatFileSize(MAX_VIDEO_SIZE)}.`,
    };
  }

  return { valid: true };
}

export function validateDocumentFile(file: File): FileValidationResult {
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid document format. Please upload PDF, DOC, DOCX, or TXT files.`,
    };
  }

  if (file.size > MAX_DOCUMENT_SIZE) {
    return {
      valid: false,
      error: `Document file is too large. Maximum size is ${formatFileSize(MAX_DOCUMENT_SIZE)}.`,
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}
