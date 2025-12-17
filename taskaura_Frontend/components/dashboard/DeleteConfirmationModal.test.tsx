import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

// Mock translation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('DeleteConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    isDeleting: false,
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
  };

  it('renders correctly when open', () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    
    expect(screen.getByRole('heading', { name: 'Delete Project' })).toBeInTheDocument();
    // Use a regex that matches the start of the text to avoid span nesting issues
    expect(screen.getByText(/Are you sure you want to delete this project/i)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<DeleteConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Delete Project')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    
    fireEvent.click(screen.getByText('common.cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('calls onConfirm when delete button is clicked', () => {
    render(<DeleteConfirmationModal {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Delete Project' }));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('displays custom title and message', () => {
    render(
      <DeleteConfirmationModal 
        {...defaultProps} 
        title="Custom Delete" 
        message="Custom warning message" 
      />
    );
    
    expect(screen.getByRole('heading', { name: 'Custom Delete' })).toBeInTheDocument();
    expect(screen.getByText('Custom warning message')).toBeInTheDocument();
  });

  it('renders loading state on delete button', () => {
    render(<DeleteConfirmationModal {...defaultProps} isDeleting={true} />);
    
    const deleteButton = screen.getByRole('button', { name: 'Delete Project' });
    expect(deleteButton).toBeDisabled();
    // Assuming Button component handles loading state visual
  });
});
