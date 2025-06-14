import Window from "../components/Window";
import { IoSearch, IoChevronDown, IoChevronUp } from "react-icons/io5";
import {
  MdSchool,
  MdHome,
  MdWork,
  MdBusiness,
  MdCode,
  MdGroup,
  MdLocationCity,
  MdFlag,
  MdStar,
  MdRocket,
  MdLightbulb,
  MdHandshake,
  MdEmojiEvents,
  MdAutoGraph,
  MdPlace
} from "react-icons/md";
import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';

const categoryIconMap = {
  // Education & Career
  "University": <MdSchool/>,
  "Work": <MdWork/>,
  "Office": <MdBusiness/>,
  "Internship": <MdCode/>,

  // Life Milestones
  "Home": <MdHome/>,
  "Hometown": <MdLocationCity/>,
  "Achievement": <MdEmojiEvents/>,
  "Milestone": <MdFlag/>,

  // Professional Development
  "Conference": <MdGroup/>,
  "Hackathon": <MdRocket/>,
  "Project": <MdLightbulb/>,
  "Collaboration": <MdHandshake/>,

  // Personal Brand
  "Impact": <MdAutoGraph/>,
  "Highlight": <MdStar/>,
  "Important": <MdPlace/>
};

const Maps = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [expandedPlace, setExpandedPlace] = useState(null);
  const [center, setCenter] = useState({ lat: 42.3398, lng: -71.0892 });
  const [zoom, setZoom] = useState(13);
  const [importantPlaces, setImportantPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getInformation("Maps");
        setImportantPlaces(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setCenter({ lat: Number(place.lat), lng: Number(place.lng) });
    setZoom(17);
  };

  const toggleExpand = (placeName) => {
    setExpandedPlace(expandedPlace === placeName ? null : placeName);
  };

  const getIconByCategory = (category) => {
    if (categoryIconMap[category]) {
      return categoryIconMap[category];
    } else {
      return categoryIconMap["Important"]
    }
  }

  return (
    <Window
      appName="Maps"
      width={1000}
      height={700}
      children={
        <div className="bg-gray-900 w-full h-full flex">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <MacOSLoader size={60} />
              <p className="mt-4 text-gray-400">Loading maps...</p>
            </div>
          ) : (
            <>
              {/* Left Side */}
              <div className="w-[30%] h-full bg-gray-800 border-r border-gray-700 overflow-y-auto">
                <div className="p-3">
                  {/* Search Bar */}
                  <div className="px-2 py-2 bg-gray-700 rounded flex items-center gap-2 mb-4">
                    <IoSearch className="text-gray-400 w-4 h-4" />
                    <span className="text-gray-400 text-xs">Search Maps</span>
                  </div>

                  {/* Important Places */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 px-2">MY PLACES</p>
                    {importantPlaces.map((place) => (
                      <div key={place.name} className={`rounded-lg mb-2 ${selectedPlace?.name === place.name ? "bg-blue-500/20" : "bg-gray-700"}`}>
                        <div className="cursor-pointer">
                          <div onClick={() => handlePlaceClick(place)} className="p-3 rounded-lg">
                            <div className="flex gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white`} style={{ backgroundColor: place.color }}>
                                {getIconByCategory(place.category)}
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-medium text-white">{place.name}</p>
                                <p className="text-xs text-gray-400">{place.category}</p>
                                <p className="text-xs text-gray-500 mt-1">{place.address}</p>
                              </div>
                            </div>
                          </div>

                          {/* Expand/Collapse Button */}
                          <div className="px-3 pb-2">
                            <button onClick={() => toggleExpand(place.name)} className="flex items-center gap-1 text-xs text-blue-400 cursor-pointer">
                              {expandedPlace === place.name ? (
                                <div className="flex items-center gap-1">
                                  <IoChevronUp className="w-3 h-3" />
                                  Hide details
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <IoChevronDown className="w-3 h-3" />
                                  Show details
                                </div>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        {expandedPlace === place.name && (
                          <div className="px-3 pb-3">
                            <p className="text-xs text-gray-300">
                              {place.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Map */}
              <div className="w-[70%] h-full relative">
                <APIProvider apiKey={import.meta.env.VITE_MAPS_API}>
                  <Map
                    center={center}
                    zoom={zoom}
                    mapId={'Personal Website'}
                    disableDefaultUI={true}
                  >
                    {importantPlaces.map((place, index) => (
                      <AdvancedMarker
                        key={place.name || `place-${index}`}
                        position={{ lat: Number(place.lat), lng: Number(place.lng) }}
                        onClick={() => handlePlaceClick(place)}
                      >
                        <Pin
                          background={place.color}
                          borderColor={'#fff'}
                          glyphColor={'#fff'}
                        />
                      </AdvancedMarker>
                    ))}
                  </Map>
                </APIProvider>

                {/* Selected Place Info */}
                {selectedPlace && (
                  <div className="absolute bottom-4 left-4 right-4 bg-gray-800 rounded-lg shadow-lg p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: selectedPlace.color }}
                      >
                        {getIconByCategory(selectedPlace.category)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{selectedPlace.name}</p>
                        <p className="text-sm text-gray-400">{selectedPlace.address}</p>
                        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                          {selectedPlace.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      }
    />
  )
}

export default Maps