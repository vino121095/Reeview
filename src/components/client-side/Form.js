import "../../styles/form.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import axios from 'axios';

const amenities = ["Fitness Center", "Parking", "Playground", "Spa", "Pools"];

const StarRating = ({ rating, setRating, hover, setHover, onRate }) => (
  <div className="flex">
    {[...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
        <label key={index} className="text-[#c0c0c0]">
          <input
            type="radio"
            value={index}
            className="radio"
            onClick={() => {
              setRating(currentRating);
              if (typeof onRate === "function") {
                onRate(currentRating); // Pass the rating to the onRate function
              } else {
                console.error("onRate is not a function");
              }
            }}
            required={true}
          />
          <FaStar
            className="star"
            size={18}
            color={
              (currentRating <= (hover || rating)) ? "#00c194 " : "#c0c0c0"
            }
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      );
    })}
  </div>
);

// StarRating.propTypes = {
//   rating: PropTypes.number,
//   setRating: PropTypes.func.isRequired,
//   hover: PropTypes.number,
//   setHover: PropTypes.func.isRequired,
//   onRate: PropTypes.func.isRequired,
// };

const Form = () => {
  const [currentName, setCurrentName] = useState("");
  const [ratings, setRatings] = useState({});
  const [overallRating, setOverallRating] = useState("");
  const [overallStarRating, setOverallStarRating] = useState(0);
  const [overallHover, setOverallHover] = useState("");
  const [hoverState, setHoverState] = useState({});
  const [opinions, setOpinions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [newOpinion, setNewOpinion] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [apartmentRatings, setApartmentRatings] = useState([]);
  const [showAddBtn, setShowAddBtn] = useState({});
  const [numRooms, setNumRooms] = useState("");
  const [apartmentSize, setApartmentSize] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [located, setLocated] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [advance, setAdvance] = useState("");
  const [repaid, setRepaid] = useState("");
  const [deduction, setDeduction] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [radio, setRadio] = useState("");
  const [internet, setInternet] = useState("");
  const [services, setServices] = useState("");
  const [complications, setComplications] = useState("");
  const [Kitchen, setKitchen] = useState("");
  const [reachability, setReachability] = useState("");
  const [owner, setOwner] = useState("");
  const [like, setLike] = useState("");
  const [disLike, setDisLike] = useState("");
  const [disruption, setDisruption] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [recommend, setRecommend] = useState("");


  useEffect(() => {
    // Combine localStorage data and fetched data
    const storedRatings = JSON.parse(localStorage.getItem("apartmentRatings")) || [];

    const fetchData = async () => {
      try {
        const response = await fetch('https://reeview.de/wp-json/v1/reviews?page=1&per_page=10&type=all');
        const fetchedData = await response.json();

        // Combine storedRatings with fetched data
        const combinedData = Array.isArray(fetchedData) ? [...storedRatings, ...fetchedData] : storedRatings;

        setApartmentRatings(combinedData);
        localStorage.setItem("apartmentRatings", JSON.stringify(combinedData));
      } catch (error) {
        console.error('Fetch Error:', error);
        setApartmentRatings(storedRatings);  // Set local data on error
      }
    };

    fetchData();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Ensure amenities and ratings are defined and ratings contains data for all amenities
    if (!amenities || !ratings) {
      alert("Amenities or ratings are not defined.");
      return;
    }
  
    const allRated = amenities.every((amenity) => ratings[amenity]);
    if (!allRated) {
      alert("Please fill out all ratings before submission.");
      return;
    }
  
    // Ensure all required fields are defined
    let newData = {
      name: currentName || "",
      overallRating: overallRating || "",
      overallStarRating: overallStarRating || 0,
      amenitiesRating: ratings || {},
      amenitiesOpinion: opinions || {},
      numRooms: numRooms || "",
      apartmentSize: apartmentSize || "",
      accommodation: accommodation || "",
      located: located || "",
      duration: duration || "",
      price: price || "",
      advance: advance || "",
      repaid: repaid || "",
      deduction: deduction || "",
      amount: amount || "",
      reason: reason || "",
      radio: radio || "",
      internet: internet || "",
      services: services || "",
      complications: complications || "",
      Kitchen: Kitchen || "",
      reachability: reachability || "",
      owner: owner || "",
      like: like || "",
      disLike: disLike || "",
      disruption: disruption || "",
      satisfaction: satisfaction || "",
      recommend: recommend || "",
      date: new Date().toISOString(),
    };
  
    try {
      const response = await fetch("https://reeview.de/wp-json/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Data submitted successfully!");
        console.log("Registration successful:", data);
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  
    // Ensure apartmentRatings is an array before updating
    const updatedRatings = Array.isArray(apartmentRatings) ? [...apartmentRatings, newData] : [newData];
    setApartmentRatings(updatedRatings);
    localStorage.setItem("apartmentRatings", JSON.stringify(updatedRatings));
  
    // Reset form fields
    setCurrentName("");
    setOverallStarRating(0);
    setOverallRating("");
    setOverallHover("");
    setRatings({});
    setOpinions({});
    setHoverState({});
    setShowAddBtn({});
    setNumRooms("");
    setApartmentSize("");
    setAccommodation("");
    setLocated("");
    setDuration("");
    setPrice("");
    setAdvance("");
    setRepaid("");
    setDeduction("");
    setAmount("");
    setReason("");
    setRadio("");
    setInternet("");
    setServices("");
    setComplications("");
    setKitchen("");
    setReachability("");
    setOwner("");
    setLike("");
    setDisLike("");
    setDisruption("");
    setSatisfaction("");
    setRecommend("");
  };
  
  const handleAddOpinion = (amenity) => {
    setCurrentAmenity(amenity);
    setShowPopup(true);
    setIsEditable(false);
  };

  const handleEditOpinion = (amenity) => {
    setCurrentAmenity(amenity);
    setNewOpinion(opinions[amenity]);
    setShowPopup(true);
    setIsEditable(true);
  };

  const handleSaveOpinion = () => {
    setOpinions({ ...opinions, [currentAmenity]: newOpinion });
    setShowPopup(false);
    setNewOpinion("");
    setIsEditable(false);
  };

  const handleStarRating = (amenity) => {
    setShowAddBtn({ ...showAddBtn, [amenity]: true });
  };

  const handleRadioChange = (e) => {
    setAccommodation(e.target.value);
  };

  const handleRadioRepaidChange = (e) => {
    setRepaid(e.target.value);
  };

  const handleRadioDeductionChange = (e) => {
    setDeduction(e.target.value);
  };

  const handleRadioRecommendChange = (e) => {
    setRecommend(e.target.value);
  };
  return (
    <>
    <section className="reviews">
      {/* <h2 className="bg-[#131842] w-full text-center p-10 text-xl"> */}
    
      <section className="mt-4">
        <h2 className="text-[#FBF6E2] text-2xl font-montserrat text-center">Feel Free To Share Your Experience</h2>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex border-2 border-black h-auto max-lg:w-[90vw] max-lg:p-4 mt-4 mb-4"
      >
        <div className="form w-full pr-4 max-lg:w-full max-xl:w-full pb-2">

        <div className="flex flex-wrap w-full">
    {/* <!-- Left side inputs --> */}
    <div className="flex flex-col w-full md:w-1/2 p-2">

    <label className="font-mono text-[gray]">
              No of rooms :
              <br></br><select
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setNumRooms(e.target.value)}
                value={numRooms}
              >
                {[...Array(99)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Apartment Size :
              <br></br><textarea
        className="border border-gray-300 p-2 w-full"
                onChange={(e) => setApartmentSize(e.target.value)}
                value={apartmentSize}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Type of Accommodation :
              <br />
              <div className="checkbox-label-container">

              <input
                type="checkbox"
                id="shared"
                name="accommodation"
                value="shared"
                checked={accommodation === 'shared'}
                onChange={handleRadioChange}
              />
              <label className="font-mono text-[black]">Shared</label>
              </div>
              <br />
              <div className="checkbox-label-container">

              <input
                type="checkbox"
                id="individual"
                name="accommodation"
                value="individual"
                checked={accommodation === 'individual'}
                onChange={handleRadioChange}
              />
              <label className="font-mono text-[black]">Individual</label>
              </div>

            </label><br></br>
            <label className="font-mono text-[gray]">
              No. of Floor the apartment located  :
              <br></br><select
               className="border border-gray-300 p-2 w-full"
                onChange={(e) => setLocated(e.target.value)}
                value={located}
              >
                {[...Array(99)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Duration of Stay in months :
              <br></br><select
                 className="border border-gray-300 p-2 w-full"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              >
                {[...Array(99)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Price of rent /month :
              <br></br><textarea
               className="border border-gray-300 p-2 w-full"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Advance amount paid :
              <br></br><textarea
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setAdvance(e.target.value)}
                value={advance}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Advance amount repaid on time ? :
              <br />
            <div className="checkbox-label-container">

              <input
                type="checkbox"
                id="yes"
                name="repaid"
                value="yes"
                checked={repaid === 'yes'}
                onChange={handleRadioRepaidChange}
              />
              <label htmlFor="repaid-yes" className="font-mono text-[black]">Yes</label>
              </div>

              <br />
            <div className="checkbox-label-container">

              <input
                type="checkbox"
                id="no"
                name="repaid"
                value="no"
                checked={repaid === 'no'}
                onChange={handleRadioRepaidChange}
              />
              <label htmlFor="repaid-no" className="font-mono text-[black]">No</label>
              </div>

            </label><br></br>
            <label className="font-mono text-[gray]">
              Was there any deduction in the Advance amount ? :
              <br />
            <div className="checkbox-label-container">

              <input
                type="checkbox"
                id="yes"
                name="deduction"
                value="yes"
                checked={deduction === 'yes'}
                onChange={handleRadioDeductionChange}
              />
              <label htmlFor="deduction-yes" className="font-mono text-[black]">Yes</label>
              </div>
              <br />
            <div className="checkbox-label-container">
              
              <input
                type="checkbox"
                id="no"
                name="deduction"
                value="no"
                checked={deduction === 'no'}
                onChange={handleRadioDeductionChange}
              />
              <label htmlFor="deduction-no" className="font-mono text-[black]">No</label>
              </div>

            </label>
            
            <br></br>
            <label className="font-mono text-[gray]">
              Amount of Deduction :
              <br></br><textarea
               className="border border-gray-300 p-2 w-full"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Reason for the deduction :
              <br></br><textarea
                 className="border border-gray-300 p-2 w-full"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
              >
              </textarea>
            </label><br></br>

            <label className="font-mono text-[gray]">
              Is EB/Internet/Heating/Radio and waste collection included ? :
              <br></br><textarea
             className="border border-gray-300 p-2 w-full"
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
              >
              </textarea>
            </label>
         

    </div>
    {/* <!-- Right side inputs --> */}
    <div className="flex flex-col w-full md:w-1/2 p-2">

    <label className="font-mono text-[gray]">
              Internet Speed :
              <br></br><textarea
                 className="border border-gray-300 p-2 w-full"
                onChange={(e) => setInternet(e.target.value)}
                value={internet}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Services included :
              <br></br><select  className="border border-gray-300 p-2 w-full"
                onChange={(e) => setServices(e.target.value)}
                value={services}
              >
                <option value="Lift">Lift</option>
                <option value="Parking">Parking</option>
                <option value="Internet">Internet</option>
                <option value="Cycle Parking">Cycle Parking</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Dryer Machine">Dryer Machine</option>
                <option value="Iron Box">Iron Box</option>
                <option value="Hairdryer">Hairdryer</option>
                <option value="Bread Toaster">Bread Toaster</option>
                <option value="Microwave">Microwave</option>
                <option value="Oven">Oven</option>
                <option value="Dishwasher">Dishwasher</option>
                <option value="Mixer/ Juicer">Mixer/ Juicer</option>
                <option value="Water Kettle">Water Kettle</option>
                <option value="Electric Rice Cooker">Electric Rice Cooker</option>
                <option value="TV">TV</option>
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Check In / Out complications  :
              <br></br><textarea
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setComplications(e.target.value)}
                value={complications}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Kitchen Quality  :
              <br></br><select
                 className="border border-gray-300 p-2 w-full"
                onChange={(e) => setKitchen(e.target.value)}
                value={Kitchen}
              >
                {[...Array(5)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Apartment reachability ?  :
              <br></br><select
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setReachability(e.target.value)}
                value={reachability}
              >
                {[...Array(5)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Owner flexibility during time of booking and exit   :
              <br></br><select
                 className="border border-gray-300 p-2 w-full"
                onChange={(e) => setOwner(e.target.value)}
                value={owner}
              >
                {[...Array(5)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              What you like the most with this apartment  :
              <br></br><textarea
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setLike(e.target.value)}
                value={like}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              What you dislike with this apartment  :
              <br></br><textarea
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setDisLike(e.target.value)}
                value={disLike}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Any disruption during stay? Water problems, Heater not working,
              water clogging in bathrooms etc..,  :
              <br></br><textarea
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setDisruption(e.target.value)}
                value={disruption}
              >
              </textarea>
            </label><br></br>
            <label className="font-mono text-[gray]">
              overall satisfaction ( Value for Money)   :
              <br></br><select
                className="border border-gray-300 p-2 w-full"
                onChange={(e) => setSatisfaction(e.target.value)}
                value={satisfaction}
              >
                {[...Array(5)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              will you recommend to others :
              <br />
              <div className="checkbox-label-container">
              <input
                type="checkbox"
                id="yes"
                name="recommend"
                value="yes"
                checked={recommend === 'yes'}
                onChange={handleRadioRecommendChange}
              />
              <label className="font-mono text-[black]">Yes</label>
              </div>
              <br />
              <div className="checkbox-label-container">
              <input
                type="checkbox"
                id="no"
                name="recommend"
                value="no"
                checked={recommend === 'no'}
                onChange={handleRadioRecommendChange}
              />
              <label className="font-mono text-[black]">No</label>
              </div>

            </label>

    </div>
  </div>

          {/* <div className="overall-rating">
            <h3 className="mb-2">
              Give your ratings
            </h3>
            <div className="complete-rating flex items-center">
              <p className="font-mono text-[gray] capitalize" id="labeltext">Ratings</p>
             
              <StarRating
                rating={overallStarRating}
                setRating={setOverallStarRating}
                hover={overallHover}
                setHover={setOverallHover}
              />
            </div>
            <div className="overall-rating-input mt-3 flex-col">
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setCurrentName(e.target.value)}
                value={currentName}
                className="w-[40%] font-mono border-2 border-black mb-2 rounded-[5px] p-2"
                id="inputplaceholder"
              />
              <p className="font-mono text-[gray]" id="labeltext">Write a feedback</p>
              <textarea
                className="overall-rating-text border-2 w-[40%] border-black pl-2 pt-2 pb-4 rounded-[5px] max-lg:w-full font-mono mt-2"
                placeholder="Please Share Your Experience"
                value={overallRating}
                onChange={(e) => setOverallRating(e.target.value)}
                id="inputplaceholder"
              />
            </div>
          </div> */}

          <div className="amenities max-lg:w-full">
            <h3 className="mb-2">
              Amenities
            </h3>
            {amenities.map((amenity) => (
              <div key={amenity} className="amenity w-full mb-4">
                <div className="each-amenity flex justify-between items-center mb-2 gap-4">
                  <label className="" id="labeltext">
                    {amenity}
                  </label>
                  <StarRating
                    rating={ratings[amenity]}
                    setRating={(rating) =>
                      setRatings({ ...ratings, [amenity]: rating })
                    }
                    hover={hoverState[amenity] || 0}
                    setHover={(hover) => {
                      setHoverState({ ...hoverState, [amenity]: hover });
                    }}
                    onRate={() => handleStarRating(amenity)}
                  />
                  {showAddBtn[amenity] &&
                    (opinions[amenity] ? (
                      <>
                        <div className="popup-result ml-4 flex items-center justify-between w-full">
                          <span className="edit-text border-2 p-3 mr-2 rounded-[5px] text-[18px] capitalize max-lg:w-[80%] max-lg:max-h-[100px] w-full">
                            {opinions[amenity]}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleEditOpinion(amenity)}
                            className="edit-btn border-2 border-[gray] font-palanquin font-extralight hover:text-black max-lg:text-[18px] p-2 rounded-[7px] text-[#219419] hover:bg-[#dcffdc]"
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddOpinion(amenity)}
                        className="add-opinion-btn border-2 border-[gray] font-palanquin font-extralight hover:text-black max-lg:text-[18px] p-2 rounded-[7px] text-[#219419] hover:bg-[#dcffdc]"
                      >
                        Add Opinion
                      </button>
                    ))
                    }
                </div>
              </div>
            ))}
          </div>

          <div className="overall-rating">
            <h3 className="mb-2">
              Give your ratings
            </h3>
            <div className="complete-rating flex items-center">
              <p className="font-mono text-[gray] capitalize" id="labeltext">Ratings</p>
             
              <StarRating
                rating={overallStarRating}
                setRating={setOverallStarRating}
                hover={overallHover}
                setHover={setOverallHover}
              />
            </div>
            <div className="overall-rating-input mt-3 flex-col">
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setCurrentName(e.target.value)}
                value={currentName}
                className="w-[40%] font-mono border-2 border-black mb-2 rounded-[5px] p-2"
                id="inputplaceholder"
              />
              <p className="font-mono text-[gray]" id="labeltext">Write a feedback</p>
              <textarea
                className="overall-rating-text border-2 w-[40%] border-black pl-2 pt-2 pb-4 rounded-[5px] max-lg:w-full font-mono mt-2"
                placeholder="Please Share Your Experience"
                value={overallRating}
                onChange={(e) => setOverallRating(e.target.value)}
                id="inputplaceholder"
              />
            </div>
          </div>

          {/* <div className="new-fields">
            <label className="font-mono text-[gray]">
              No of rooms :
              <br></br><select
                className="w-[40%] font-mono border-2 border-black mb-2 rounded-[5px] p-2 mt-2"
                onChange={(e) => setNumRooms(e.target.value)}
                value={numRooms}
              >
                {[...Array(99)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label><br></br>
            <label className="font-mono text-[gray]">
              Apartment Size :
              <br></br><select
                className="w-[40%] font-mono border-2 border-black mb-2 rounded-[5px] p-2 mt-2"
                onChange={(e) => setApartmentSize(e.target.value)}
                value={apartmentSize}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div> */}

          <div className="form-btn">
            <button
              type="submit"
              className="mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* {showPopup && (
        <div className="popup border-[1px] border-black w-[60vw] max-lg:w-[80vw] max-lg:p-2 max-lg:mr-2 h-[40vh] fixed z-[2] left-[20vw] max-lg:left-[8vw] top-[20vh] shadow-[4px_4px_0_0_black] bg-[#fff]">
          <div className="popup-header flex items-center justify-between max-lg:p-2 max-lg:mr-4">
            <h2 className="font-palanquin text-[24px] max-lg:text-[18px] text-[gray]">
              Opinion about {currentAmenity}
            </h2>
            <IoIosCloseCircleOutline
              className="popup-close-btn text-[30px] text-[#7f7f7f] hover:text-[#c7c7c7]"
              onClick={() => setShowPopup(false)}
            />
          </div>
          <div className="popup-body p-4">
            <textarea
              placeholder={`Opinion on ${currentAmenity}`}
              value={newOpinion}
              onChange={(e) => setNewOpinion(e.target.value)}
              className="w-full h-[150px] p-2 border-2 border-black"
            />
          </div>
          <div className="popup-footer p-4">
            <button
              onClick={handleSaveOpinion}
              className="popup-save-btn bg-[#131842] text-white p-2"
            >
              {isEditable ? "Update Opinion" : "Add Opinion"}
            </button>
          </div>
        </div>
      )} */}
 {showPopup && (
    <div className="fixed inset-0 z-[2] bg-[rgba(0,0,0,0.55)] flex items-center justify-center">
        
        <div className="popup-content w-full max-w-[600px] p-4 bg-white rounded-[8px] ">
            <div className="popup-header flex items-center justify-between">
                <h2 className="font-palanquin text-[24px] text-[gray]">
                    Opinion about {currentAmenity}
                </h2>
                <IoIosCloseCircleOutline
                    className="popup-close-btn text-[30px] text-[#7f7f7f] hover:text-[#c7c7c7]"
                    onClick={() => setShowPopup(false)}
                />
            </div>
            <div className="popup-body p-4">
                <textarea
                    placeholder={`Opinion on ${currentAmenity}`}
                    value={newOpinion}
                    onChange={(e) => setNewOpinion(e.target.value)}
                    className="w-full h-[150px] p-2 border-2 border-black"
                />
            </div>
            <div className="popup-footer p-4">
                <button
                    onClick={handleSaveOpinion}
                    className="popup-save-btn text-white p-2"
                    style={{
                      cursor: 'pointer',
                      color: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '16px',
                      border: '1px solid #00c194',
                      backgroundColor: '#00c194',
                      transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#00c194';
                  }}
                  onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#00c194';
                      e.currentTarget.style.color = '#ffffff';
                  }}
                >
                    {isEditable ? "Update Opinion" : "Add Opinion"}
                </button>
            </div>
        </div>
    </div>
)}



    </section>
    </>
  );
};

export default Form;

