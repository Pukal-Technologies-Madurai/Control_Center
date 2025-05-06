import { toast } from 'react-hot-toast';

function MyComponent() {
  const handleButtonClick = (data) => {
    toast.success('data'); 
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Show Success Toast</button>
    </div>
  );
}