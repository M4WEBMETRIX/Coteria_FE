import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, PartyPopper } from 'lucide-react';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserCircle } from '@phosphor-icons/react';

const communitySchema = z.object({
    image: z.string().min(3, 'Community image is required'),
    name: z.string().min(3, 'Community name must be at least 3 characters'),
    category: z.string().min(1, 'Category is required'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
    visibility: z.enum(['private', 'public']),
    management: z.enum(['admin', 'members']),
});

type CommunityFormValues = z.infer<typeof communitySchema>;

const CreateCommunityDialog = () => {
    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        control,
    } = useForm<CommunityFormValues>({
        mode: 'onChange',
        resolver: zodResolver(communitySchema),
        defaultValues: {
            image: '',
            name: '',
            category: '',
            description: '',
            visibility: 'private',
            management: 'admin',
        },
    });

    const onSubmit = async (data: CommunityFormValues) => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Community created:', data);
        setLoading(false);
        setShowSuccess(true);

        // Reset after 2 seconds
        setTimeout(() => {
            setShowSuccess(false);
            setOpen(false);
            reset();
        }, 2000);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setShowSuccess(false);
            reset();
        }
        setOpen(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className='bg-[#000000] hover:bg-[#000000]/90 text-white font-medium px-6 py-5 rounded-full flex items-center gap-2'>
                    <Plus className='w-5 h-5' />
                    Create Community
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[80%] max-h-[90vh] overflow-y-auto'>
                {showSuccess ? (
                    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
                        <div className='w-16 h-16 rounded-full bg-[#12AA5B]/10 flex items-center justify-center'>
                            <PartyPopper className='w-8 h-8 text-[#12AA5B]' />
                        </div>
                        <div className='text-center space-y-2'>
                            <h3 className='text-2xl font-semibold text-[#0A0A0C]'>
                                Women Empowerment Created!
                            </h3>
                            <p className='text-sm text-[#414143]'>
                                Your community has been successfully created and
                                is ready to go.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='space-y-5 mt-4'>
                            {/* Upload image */}
                            <Field>
                                <FieldContent className=''>
                                    <div className='grid place-content-center w-[150px]  pl-3'>
                                        <label
                                            htmlFor='upload-image'
                                            className='w-[120px] relative h-[120px] bg-[#EFF0F3] rounded-full flex items-center justify-center cursor-pointer'>
                                            <UserCircle size={60} />
                                        </label>
                                        <Button
                                            type='button'
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        'upload-image'
                                                    )
                                                    ?.click()
                                            }
                                            className='px-6  mt-[-15px] z-999   rounded-full bg-linear-to-b from-[#026451] to-[#003D29] text-white w-[120px]'>
                                            Upload photo
                                        </Button>
                                        <Input
                                            id='upload-image'
                                            type='file'
                                            placeholder='Enter community name'
                                            {...register('image')}
                                            className='bg-[#F6F6F6] border-0 hidden'
                                        />
                                    </div>

                                    <FieldError errors={[errors.image]} />
                                </FieldContent>
                            </Field>
                            {/* Community Name */}
                            <Field>
                                <FieldLabel className='text-[#0A0A0C] font-medium'>
                                    Community Name*
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        placeholder='Enter community name'
                                        {...register('name')}
                                        className='bg-[#F6F6F6] border-0'
                                    />
                                    <FieldError errors={[errors.name]} />
                                </FieldContent>
                            </Field>

                            {/* Category */}
                            <Field>
                                <FieldLabel className='text-[#0A0A0C] font-medium flex flex-col justify-start items-start '>
                                    Short description of what this community
                                    exists to do.
                                    <p className='italic font-medium text-xs text-[#1E1F24] -mt-2'>
                                        (This helps supporters understand the
                                        focus of the community)
                                    </p>
                                </FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        placeholder='Community'
                                        {...register('category')}
                                        className='bg-[#F6F6F6] border-0 min-h-[164px]'
                                    />
                                    <FieldError errors={[errors.category]} />
                                </FieldContent>
                            </Field>

                            {/* Description */}
                            <Field>
                                <FieldLabel className='text-[#0A0A0C] font-medium'>
                                    Community Description*
                                </FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        placeholder='Enter  community description'
                                        {...register('description')}
                                        className='bg-[#F6F6F6] border-0 min-h-[100px] resize-none'
                                    />
                                    <FieldError errors={[errors.description]} />
                                </FieldContent>
                            </Field>

                            {/* Visibility */}
                            <Field>
                                <FieldLabel className='text-[#0A0A0C] font-medium'>
                                    Who can see this community?
                                </FieldLabel>
                                <FieldContent>
                                    <Controller
                                        name='visibility'
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <SelectTrigger className='bg-[#F6F6F6] border-0 w-full'>
                                                    <SelectValue placeholder='Select visibility' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='private'>
                                                        Private (invite only)
                                                    </SelectItem>
                                                    <SelectItem value='public'>
                                                        Public
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FieldError errors={[errors.visibility]} />
                                </FieldContent>
                            </Field>

                            {/* Management */}
                            <Field>
                                <FieldLabel className='text-[#0A0A0C] font-medium'>
                                    Who can manage it?
                                </FieldLabel>
                                <FieldContent>
                                    <Controller
                                        name='management'
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <SelectTrigger className='bg-[#F6F6F6] border-0 w-full'>
                                                    <SelectValue placeholder='Select management' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='admin'>
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value='members'>
                                                        Members
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FieldError errors={[errors.management]} />
                                </FieldContent>
                            </Field>

                            <div className='flex justify-between'>
                                {' '}
                                <DialogClose>
                                    <Button
                                        type='button'
                                        variant={'ghost'}
                                        className='w-fit  py-3 px-4 bg-[#EFF0F3] rounded-full'>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    loading={loading}
                                    disabled={!isValid}
                                    type='submit'
                                    className='w-fit bg-[#12AA5B] hover:bg-[#12AA5B]/90 text-white font-semibold py-3 px-4 rounded-full'>
                                    {loading
                                        ? 'Creating...'
                                        : 'Create Community'}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateCommunityDialog;
