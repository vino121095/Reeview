import './App.css';
import './index.css';
// import { Reviews } from './components/client-side/Reviews';
// import { SampleReviews } from './components/client-side/SampleReviews';
import ApartmentAmenities from './components/client-side/ApartmentAmenities';
// import Form from './components/client-side/Form';

function App() {
  // Get the current path from the window location
  const getCurrentPath = () => window.location.pathname;

  // Render different components based on the current path
  const renderComponent = () => {
    const path = getCurrentPath();
    switch (path) {
      case '/form':
        // Uncomment and use <Form /> if needed
        // return <Form />;
        break; // Add break statement
      case '/reviews':
        // Uncomment and use <Reviews /> if needed
        // return <Reviews />;
        break; // Add break statement
      default:
        return <ApartmentAmenities />;
    }
  };

  return (
    <div>
      {/* Uncomment and use navigation if needed */}
      {/* <nav>
        <button onClick={() => navigateTo('/')}>Apartment Amenities</button>
      </nav> */}
      {renderComponent()}
    </div>
  );
}

export default App;
