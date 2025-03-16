"use client";

import carFormFields from "../shared/car-details.json";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";

export default function AddListing() {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/add-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("Listing added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <Card className="w-full max-w-4xl shadow-lg rounded-lg border p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center">Add a New Listing</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carFormFields.carDetails.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>

                  {field.fieldType === "dropdown" ? (
                    <Combobox field={field} onSelect={(value) => handleChange(field.name, value)} />
                  ) : field.fieldType === "textarea" ? (
                    <Textarea
                      name={field.name}
                      className="border p-2 rounded w-full"
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  ) : (
                    <Input
                      type={field.fieldType}
                      name={field.name}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <Button type="submit" className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">
                Submit Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Combobox({ field, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selected || `Select ${field.label}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            {field.options.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => {
                  setSelected(option);
                  onSelect(option);
                  setOpen(false);
                }}
              >
                {option} {selected === option && <Check className="ml-2 h-4 w-4" />}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
