
import { Camera, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AdminUploadButton = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; role: string; imageSrc: string }>>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would upload to a server here
      console.log("Submitting team member:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add the new team member to the list
      if (preview) {
        setTeamMembers([
          ...teamMembers,
          {
            name: data.name,
            role: data.role,
            imageSrc: preview,
          },
        ]);
      }
      
      // Reset form
      form.reset();
      setPreview(null);
      setShowUploadDialog(false);
    } catch (error) {
      console.error("Error adding team member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setShowUploadDialog(true)}
        variant="outline"
        className="border-dashed border-primary hover:border-primary/90 group"
      >
        <Users size={18} className="mr-2 text-primary group-hover:scale-110 transition-transform" />
        <span>Admin Team</span>
      </Button>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Upload profile pictures for your team members to display on the website.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                    {preview ? (
                      <AvatarImage src={preview} alt="Preview" />
                    ) : (
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <Users size={32} />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-background border-2 border-primary"
                    onClick={() => document.getElementById("profile-upload")?.click()}
                  >
                    <Camera size={14} />
                  </Button>
                </div>
                <Input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Team member name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Founder, Designer, Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Adding..." : "Add Team Member"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Display team members if any are added (in a real app, these would come from a database) */}
      {teamMembers.length > 0 && (
        <div className="fixed bottom-16 right-6 bg-background border border-border rounded-lg shadow-lg p-4 max-w-xs z-10">
          <h4 className="font-medium mb-2">Team Members</h4>
          <div className="space-y-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.imageSrc} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUploadButton;
