
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MemeUploadDialog } from "@/components/MemeUploadDialog";

interface UploadButtonProps {
  defaultCategory?: string;
}

const UploadButton = ({ defaultCategory }: UploadButtonProps) => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setShowUploadDialog(true)}
        className="group gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
      >
        <Upload size={18} className="transition-transform group-hover:-translate-y-1" />
        <span>Upload Meme</span>
      </Button>

      <MemeUploadDialog 
        open={showUploadDialog} 
        onOpenChange={setShowUploadDialog}
        defaultCategory={defaultCategory}
      />
    </>
  );
};

export default UploadButton;
