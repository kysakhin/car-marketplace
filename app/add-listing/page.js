"use client";

import carFormFields from "../shared/car-details.json";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, PlusCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function AddListing() {
  const [formData, setFormData] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { userId } = useAuth();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(2)
      }));
      
      const updatedImages = [...selectedImages, ...newImages];
      setSelectedImages(updatedImages);
      
      if (activePreview === null && updatedImages.length > 0) {
        setActivePreview(updatedImages[0].id);
      }
    }
  };


  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (featureName) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureName) ? prev.filter((item) => item !== featureName) : [...prev, featureName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      finalData.append(key, value);
    })

    finalData.append("userId", userId);
    finalData.append("selectedFeatures", selectedFeatures);

    selectedImages.forEach((image, index) => {
      finalData.append("images", image.file);
    });

    selectedImages.forEach((image, index) => {
      formData.append('images', image.file);
    })

    try {
      const res = await fetch("/api/add-listing", {
        method: "POST",
        body: finalData,
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("Listing added successfully!");
      setFormData({ listingTitle: "", tagline: "", originalPrice: "", sellingPrice: "", category: "", condition: "", maker: "", year: "", transmission: "", engineSize: "", cylinders: "", color: "", description: "" });
      setSelectedFeatures([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Add a New Listing</h1>
          <p className="text-blue-100 text-center mt-2 max-w-2xl mx-auto">
            Fill in the details below to create your car listing. The more information you provide, the better!
          </p>
        </div>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {carFormFields.carDetails.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>

                  {field.fieldType === "dropdown" ? (
                    <Combobox field={field} value={formData[field.name] || ""} onSelect={(value) => handleChange(field.name, value)} />
                  ) : field.fieldType === "textarea" ? (
                    <Textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      className="min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <Input
                      type={field.fieldType}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <CarFeaturesSelection selectedFeatures={selectedFeatures} onFeatureChange={handleFeatureChange} />

            <ImageUpload handleImageChange={handleImageChange} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />

            {/* Submit Button */}
            <div className="flex justify-center mt-12">
              <Button 
                type="submit" 
                className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 px-8 rounded-lg text-lg shadow-lg transition-all duration-200 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                <span>Submit Listing</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Combobox({ field, value, onSelect }) {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between py-2.5 px-4 text-left font-normal bg-white border-gray-300 hover:bg-gray-50 hover:border-blue-400 transition-all shadow-sm rounded-lg"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || `Select ${field.label}`}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 shadow-xl rounded-lg border-gray-200 overflow-hidden">
        <Command className="bg-white">
          <CommandInput placeholder="Search..." className="border-none focus:ring-0 py-3 text-sm" />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-gray-500">No results found.</CommandEmpty>
            <div className="max-h-64 overflow-y-auto py-1">
              {field.options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="flex items-center py-2.5 px-4 cursor-pointer hover:bg-blue-50"
                >
                  <span className="flex-grow">{option}</span>
                  {value === option && <Check className="ml-2 h-4 w-4 text-blue-600" />}
                </CommandItem>
              ))}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CarFeaturesSelection({ selectedFeatures, onFeatureChange }) {
  return (
    <div className="mt-10 p-6 md:p-8 bg-blue-50 rounded-xl border border-blue-100 shadow-inner">
      <h2 className="text-2xl md:text-2xl font-semibold text-blue-800">Vehicle Features</h2>
      <p className="text-blue-600 mb-6">Select all features that apply to your vehicle</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {carFormFields.carFeatures.map((feature) => (
          <label key={feature.name} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
            <input
              type="checkbox"
              name={feature.name}
              checked={selectedFeatures.includes(feature.name)}
              onChange={() => onFeatureChange(feature.name)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{feature.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const ImageUpload = ({ handleImageChange, selectedImages, setSelectedImages }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activePreview, setActivePreview] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const newImages = files.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(2)
      }));
      
      const updatedImages = [...selectedImages, ...newImages];
      setSelectedImages(updatedImages);
      
      // Set the first image as active preview if none is selected
      if (activePreview === null && updatedImages.length > 0) {
        setActivePreview(updatedImages[0].id);
      }
    }
  };

  const removeImage = (id) => {
    setSelectedImages(prev => {
      const filteredImages = prev.filter(image => image.id !== id);
      
      // If we're removing the active preview, select a new one
      if (activePreview === id) {
        if (filteredImages.length > 0) {
          setActivePreview(filteredImages[0].id);
        } else {
          setActivePreview(null);
        }
      }
      
      return filteredImages;
    });
  };

  const getActiveImage = () => {
    return selectedImages.find(img => img.id === activePreview);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Upload Section */}
        <div className="md:w-1/2">
          <div 
            className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <svg 
                className="mx-auto h-10 w-10 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop multiple images here or
              </p>
              <label className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors">
                Browse files
                <input 
                  type="file" 
                  className="hidden"
                  accept="image/*" 
                  onChange={handleImageChange}
                  multiple
                />
              </label>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              {selectedImages.length > 0 && (
                <span>{selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Preview Section */}
        <div className="md:w-1/2">
          <div className="border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center h-48 overflow-hidden">
            {activePreview ? (
              <div className="relative w-full h-full">
                <img 
                  src={getActiveImage()?.previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-contain" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                  {getActiveImage()?.file.name} ({Math.round(getActiveImage()?.file.size / 1024)} KB)
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <svg 
                  className="mx-auto h-12 w-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2">No images selected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Preview Strip */}
      {selectedImages.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">All Images</h3>
            <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{selectedImages.length}</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {selectedImages.map((image) => (
              <div 
                key={image.id} 
                className={`relative flex-shrink-0 w-24 h-24 border-2 rounded-md overflow-hidden cursor-pointer ${
                  activePreview === image.id ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setActivePreview(image.id)}
              >
                <img 
                  src={image.previewUrl} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover" 
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
                >
                  <svg 
                    className="h-3 w-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
