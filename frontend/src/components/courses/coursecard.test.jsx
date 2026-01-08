import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourseCard from './CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    _id: '1',
    title: 'Test Course',
    description: 'This is a test course description',
    price: 99,
    category: 'Programming',
    difficulty: 'beginner',
    thumbnailUrl: 'https://example.com/image.jpg',
  };

  it('renders course information correctly', () => {
    render(
      <BrowserRouter>
        <CourseCard course={mockCourse} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('This is a test course description')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('Programming')).toBeInTheDocument();
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  it('renders link to course detail page', () => {
    render(
      <BrowserRouter>
        <CourseCard course={mockCourse} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses/1');
  });
});
