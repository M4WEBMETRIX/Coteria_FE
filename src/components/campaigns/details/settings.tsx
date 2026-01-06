import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, Trash2, AlertTriangle } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      {/* General Settings */}
      <section className="space-y-6 rounded-xl border border-[#DFE1E7] bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-[#1E1F24]">General Settings</h3>
          <p className="text-sm text-[#8B8D98]">Manage your campaign's core information.</p>
        </div>
        <Separator />

        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Campaign Title</Label>
            <Input id="title" defaultValue="Reclaiming our Green Space" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="goal">Fundraising Goal ($)</Label>
            <Input id="goal" type="number" defaultValue="50000" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="community">
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="community">Community Project</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign..."
              className="h-24 resize-none"
              defaultValue="A community-driven initiative to transform the empty lot on 5th Avenue into a public garden."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="gap-2 bg-[#12AA5B] text-white hover:bg-[#0E904B]">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </section>

      {/* Visibility Settings */}
      <section className="space-y-6 rounded-xl border border-[#DFE1E7] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-[#1E1F24]">Campaign Visibility</h3>
            <p className="text-sm text-[#8B8D98]">Control who can see your campaign.</p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="visibility-mode" className="text-sm font-medium text-[#4A4C54]">
              Public
            </Label>
            <Switch id="visibility-mode" defaultChecked />
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-6 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-red-100 p-2 text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold text-[#1E1F24]">Danger Zone</h3>
            <p className="text-sm text-[#4A4C54]">
              Once you delete a campaign, there is no going back. Please be certain.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="destructive" className="gap-2 bg-red-600 hover:bg-red-700">
            <Trash2 size={16} />
            Delete Campaign
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
