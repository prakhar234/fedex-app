export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    thumbnailUrl?: string;
}

export interface IUser extends User {
    id: string;
}

export interface UserAlbum {
    albumId: string;
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
}