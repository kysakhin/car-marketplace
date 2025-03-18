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

export default function AddListing() {
  const [formData, setFormData] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState([]);

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

    const finalData = {
      ...formData,
      selectedFeatures,
    };

    try {
      const res = await fetch("/api/add-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
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
