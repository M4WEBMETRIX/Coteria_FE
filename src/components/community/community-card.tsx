import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Users } from 'lucide-react';

interface CommunityCardProps {
    name: string;
    description: string;
    category: string;
    location?: string;
    members: number;
    satisfactionRate: number;
    retentionCulture: number;
    createdAt: string;
}

const CommunityCard = ({
    name,
    description,
    category,
    location,
    members,
    satisfactionRate,
    retentionCulture,
    createdAt,
}: CommunityCardProps) => {
    return (
        <Card className='hover:shadow-lg transition-shadow cursor-pointer border-[#E5E5E5]'>
            <CardHeader className='space-y-4'>
                <div className='flex items-start justify-between'>
                    <div className='space-y-2 flex-1'>
                        <div className='flex items-center gap-2'>
                            <CardTitle className='text-lg font-semibold text-[#0A0A0C]'>
                                {name}
                            </CardTitle>
                            <Badge className='bg-[#12AA5B] hover:bg-[#12AA5B]/90 text-white text-xs px-2 py-0.5'>
                                {category}
                            </Badge>
                        </div>
                        <CardDescription className='text-sm text-[#414143] line-clamp-2'>
                            {description}
                        </CardDescription>
                    </div>
                </div>

                {/* Location and Members */}
                <div className='flex items-center gap-4 text-sm text-[#414143]'>
                    {location && (
                        <div className='flex items-center gap-1'>
                            <MapPin className='w-4 h-4' />
                            <span>{location}</span>
                        </div>
                    )}
                    <div className='flex items-center gap-1'>
                        <Users className='w-4 h-4' />
                        <span>{members} members</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className='space-y-4'>
                {/* Satisfaction Rate */}
                <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-[#414143]'>
                            Total Community Members
                        </span>
                        <span className='font-semibold text-[#12AA5B]'>
                            {satisfactionRate}%
                        </span>
                    </div>
                    <Progress value={satisfactionRate} className='h-2' />
                </div>

                {/* Retention Culture */}
                <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-[#414143]'>
                            Retention Culture
                        </span>
                        <span className='font-semibold text-[#12AA5B]'>
                            {retentionCulture}%
                        </span>
                    </div>
                    <Progress value={retentionCulture} className='h-2' />
                </div>

                {/* Created Date */}
                <div className='pt-2 border-t border-[#E5E5E5]'>
                    <p className='text-xs text-[#414143]'>
                        Created {createdAt}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommunityCard;
