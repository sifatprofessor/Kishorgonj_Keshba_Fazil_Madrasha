import { render, fireEvent, screen } from '@testing-library/react';
import DashNavButton from '../DashNavButton';

describe('DashNavButton component', () => {
  // Test rendering and click handling
  it('renders button with children and calls onClick function when clicked', () => {
    // Mock onClick function
    const onClickMock = jest.fn();
    // Render the DashNavButton with mock props
    render(
      <DashNavButton onClick={onClickMock} className="custom-class">
        Click me
      </DashNavButton>
    );
    // Find the button element
    const button = screen.getByText('Click me');
    // Simulate a click event
    fireEvent.click(button);
    // Expect onClick function to be called
    expect(onClickMock).toHaveBeenCalled();
  });

  // Test styling
  it('applies correct class names and inline styles based on props', () => {
    // Render the DashNavButton with isAbsolute prop set to true
    render(
      <DashNavButton isAbsolute position={{ top: '10px', left: '20px' }}>
        Absolute Button
      </DashNavButton>
    );
    // Find the button element
    const button = screen.getByRole('button', { name: /Absolute Button/ });
    // Expect button to have the 'glass' class
    expect(button).toHaveClass('glass');
    // Expect button to have inline styles for position
    expect(button).toHaveStyle('position: absolute');
    expect(button).toHaveStyle('top: 10px');
    expect(button).toHaveStyle('left: 20px');
  });

  it('renders button with icon when icon prop is provided', () => {
    // Render the DashNavButton with icon prop set
    render(
      <DashNavButton icon={<i className="fa fa-home" />} onClick={() => {}}>
        Button with Icon
      </DashNavButton>
    );
    // Find the button element using getByRole
    const button = screen.getByRole('button', { name: /Button with Icon/ });
    // Expect button to contain the provided icon element
    expect(button).toContainHTML('<i class="fa fa-home"></i>');
  });
  
  
});
