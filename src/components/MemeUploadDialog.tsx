
import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category, getAllCategories, categoryInfo } from "@/data/memes";
import { Image, Upload, FileUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MemeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
}

type FormData = {
  title: string;
  category: Category;
  description: string;
  image: FileList;
};

export function MemeUploadDialog({ 
  open, 
  onOpenChange,
  defaultCategory 
}: MemeUploadDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const categories = getAllCategories();

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      category: defaultCategory as Category || "science",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Meme submitted!",
        description: "Your meme has been submitted for review.",
      });
      onOpenChange(false);
      form.reset();
      setPreviewUrl(null);
    }, 1500);
    
    console.log("Meme upload data:", {
      ...data,
      image: data.image[0]?.name || "No image selected",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload a New Meme</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <FormLabel>Meme Image</FormLabel>
                <div 
                  className={`border-2 border-dashed rounded-lg p-4 transition-colors
                    ${previewUrl ? 'border-primary/50 bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 bg-muted/10'}`}
                >
                  {previewUrl ? (
                    <div className="relative aspect-video flex items-center justify-center overflow-hidden rounded-md">
                      <img 
                        src={previewUrl} 
                        alt="Meme preview" 
                        className="max-h-[250px] rounded-md object-contain"
                      />
                      <Button 
                        type="button" 
                        variant="secondary" 
                        size="sm" 
                        className="absolute bottom-2 right-2 opacity-80 hover:opacity-100"
                        onClick={() => {
                          setPreviewUrl(null);
                          form.setValue("image", undefined as any);
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="meme-image" className="flex flex-col items-center justify-center gap-2 cursor-pointer py-8">
                      <FileUp className="h-10 w-10 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG or GIF up to 5MB
                      </span>
                      <Input 
                        id="meme-image"
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        {...form.register("image", { required: "Please upload an image" })}
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                {form.formState.errors.image && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.image.message}
                  </p>
                )}
              </div>

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Please enter a title" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a catchy title for your meme" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Please select a category" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {categoryInfo[category].emoji} {categoryInfo[category].name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Please enter a description" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a witty description for your meme"
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isUploading}
                className="gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Upload Meme</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
