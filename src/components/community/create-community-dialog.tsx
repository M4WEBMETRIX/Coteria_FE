import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
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
import { Plus, PlusIcon } from 'lucide-react';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRightIcon, UserCircle } from '@phosphor-icons/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    TypeCursorIcon,
    Upload03FreeIcons,
    UserGroup03Icon,
} from '@hugeicons/core-free-icons';

const communitySchema = z.object({
    image: z.string().optional(),
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
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        control,
        setValue,
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setValue('image', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: CommunityFormValues) => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Community created:', data);
        setLoading(false);
        setShowSuccess(true);

        // Reset after 2 seconds
        setTimeout(() => {
            // setShowSuccess(false);
            // setOpen(false);
            reset();
            setImagePreview(null);
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
                <Button className='bg-[#000000] cursor-pointer  hover:bg-[#000000]/90 text-white font-medium px-6 py-5 rounded-full flex items-center gap-2'>
                    <PlusIcon size={20} />
                    Create Community
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[80%] max-h-[90vh] overflow-y-auto font-inter'>
                {showSuccess ? (
                    <div className='py-8 px-6 space-y-6'>
                        <div className='text-center space-y-2'>
                            <h3 className='text-2xl font-semibold text-[#0A0A0C] flex items-center justify-center gap-2'>
                                <span>🎉</span> Women Empowerment Created!
                            </h3>
                            <p className='text-sm text-[#8b8d98]'>
                                Your community is ready. Choose what you'd like
                                to do next to start building participation.
                            </p>
                        </div>

                        <div className='space-y-3'>
                            {/* Create a Campaign */}
                            <button className='w-full bg-[#F6F6F6] hover:bg-[#EEEEEE] p-4 rounded-lg text-left transition-colors group'>
                                <div className='flex  items-end justify-between gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='mt-1 bg-white h-12 w-12 rounded-[12px] grid place-items-center'>
                                            <HugeiconsIcon
                                                icon={TypeCursorIcon}
                                                size={24}
                                                color='#1e1f24'
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <h4 className='font-semibold text-[#0A0A0C] mb-1 text-base'>
                                                Create a Campaign
                                            </h4>
                                            <p className='text-sm text-[#8B8D98]'>
                                                Create a focused campaign inside
                                                this community to give
                                                supporters a clear way to
                                                participate and contribute.
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRightIcon size={28} color='#1E1F24' />
                                </div>
                            </button>

                            {/* Invite Members */}
                            <button className='w-full bg-[#F6F6F6] hover:bg-[#EEEEEE] p-4 rounded-lg text-left transition-colors group'>
                                <div className='flex items-end justify-between gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='mt-1 bg-white h-12 w-12 rounded-[12px] grid place-content-center'>
                                            {' '}
                                            <HugeiconsIcon
                                                icon={Upload03FreeIcons}
                                                size={24}
                                                color='#1e1f24'
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <h4 className='font-semibold text-[#0A0A0C]'>
                                                    Invite Members
                                                </h4>
                                                <span className='text-xs px-2 py-0.5 bg-[#47D198] text-white rounded-full'>
                                                    Recommended
                                                </span>
                                            </div>
                                            <p className='text-sm text-[#8B8D98]'>
                                                Invite supporters, partners, or
                                                champions to join this community
                                                and start engaging.
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRightIcon size={28} color='#1E1F24' />
                                </div>
                            </button>

                            {/* Get Share Links & Embeds */}
                            <button className='w-full bg-[#F6F6F6] hover:bg-[#EEEEEE] p-4 rounded-lg text-left transition-colors group'>
                                <div className='flex items-end justify-between gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='mt-1 bg-white h-12 w-12 rounded-[12px] grid place-content-center'>
                                            {' '}
                                            <HugeiconsIcon
                                                icon={UserGroup03Icon}
                                                color='#1e1f24'
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <h4 className='font-semibold text-[#0A0A0C] mb-1'>
                                                Get Share Links & Embeds
                                            </h4>
                                            <p className='text-sm text-[#8B8D98]'>
                                                Share this community on your
                                                website, emails, or social
                                                channels to grow participation
                                                organically.
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRightIcon size={28} color='#1E1F24' />
                                </div>
                            </button>
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
                                            className='w-[120px] relative h-[120px] bg-[#EFF0F3] rounded-full flex items-center justify-center cursor-pointer overflow-hidden'>
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt='Preview'
                                                    className='w-full h-full object-cover'
                                                />
                                            ) : (
                                                <UserCircle size={60} />
                                            )}
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
                                            style={{
                                                background:
                                                    'radial-gradient(34.12% 80.21% at 50% 7.29%, #12AA5B 0%, #026451 100%)',
                                            }}
                                            className='px-6  mt-[-15px] z-999   rounded-full text-white w-[120px]'>
                                            Upload photo
                                        </Button>
                                        <Input
                                            id='upload-image'
                                            type='file'
                                            accept='image/*'
                                            onChange={handleImageChange}
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
