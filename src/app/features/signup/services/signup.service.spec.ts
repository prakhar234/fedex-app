import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SignupService } from './signup.service';
import {
  IUser,
  User,
  UserAlbum,
} from '../../../shared/interfaces/user.interface';

describe('SignupService', () => {
  let service: SignupService;
  let httpTestingController: HttpTestingController;

  const fakeThumbnailResponse: UserAlbum = {
    albumId: '1',
    id: '6',
    title: 'accusamus ea aliquid et amet sequi nemo',
    url: 'https://via.placeholder.com/600/56a8c2',
    thumbnailUrl: 'https://via.placeholder.com/150/56a8c2',
  };

  const fakeUserResponse: IUser = {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    thumbnailUrl: 'abcd',
  };

  const fakeUser: User = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    thumbnailUrl: 'abcd',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SignupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetech thumbnail Url based on the parameter', () => {
    service.getThumbnailUrl(6).subscribe((thumbnailUrl) => {
      expect(thumbnailUrl).toBeTruthy();
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/photos/6'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(fakeThumbnailResponse);
  });

  it('should post user', () => {
    service.submitUser(fakeUser).subscribe((user: IUser) => {
      expect(user.id).toBe(fakeUserResponse.id);
      expect(user.firstName).toBe(fakeUserResponse.firstName);
      expect(user.lastName).toBe(fakeUserResponse.lastName);
      expect(user.thumbnailUrl).toBe(fakeUserResponse.thumbnailUrl);
      expect(user.email).toBe(fakeUserResponse.email);
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(fakeUserResponse);
  });
});
