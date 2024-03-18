import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Separator } from "@radix-ui/react-dropdown-menu";

type Props = {
    dateJoined?: string; // Optional prop for date joined
    favoriteFilm?: string; // Optional prop for favorite film
    filmsWatched?: number; // Optional prop for films watched
    reviews?: number; // Optional prop for reviews count
};

const ProfilePicture = ({ dateJoined = "Unknown", favoriteFilm = "None", filmsWatched = 0, reviews = 0 }: Props) => {
    return (
        <div className='mt-5 max-w-[1280px] min-h-[720px] mx-auto'>
            <Card className='p-5 min-h-[540px] max-w-[300px] flex flex-col items-center pr-10'> {/* Increased padding right */}
                <CardTitle className='text-2xl font-semibold mb-4'>Morty</CardTitle>
                    <div className="flex items-center justify-center space-x-4 rounded-full border-2 h-55 w-55"> {/* Circular border with specified height and width */}
                        <Avatar className='flex items-center justify-center w-40 h-40'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                <Separator className="my-4"/>
                <Card className= 'w-full' /*"flex items-center space-x-4 rounded-md border-2"*/> {/* Apply border styling here */}
                    <CardContent className='text-start mr-16 mt-12'>
                    <div className='border-b-2 py-2 w-full'><span className='font-bold'>Date joined:</span> {dateJoined}</div>
                        <Separator className="my-4 color-blue" />
                        <div className='border-b-2 py-2 w-30px'><span className='font-bold'>Favorite film:</span> {favoriteFilm}</div>
                                        <Separator className="my-4"/>
                        <div className='border-b-2 py-2 w-30px'><span className='font-bold'>Films watched:</span> {filmsWatched}</div>
                        <div className='py-2 w-30px'><span className='font-bold'>Reviews:</span> {reviews}</div>
                    </CardContent>
                </Card>
            </Card>
        </div>
    );
}

export default ProfilePicture;

