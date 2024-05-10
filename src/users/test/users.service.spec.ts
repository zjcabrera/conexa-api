import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/services';
import { UsersRepository } from '../../users/repositories';
import { RolesService } from 'src/roles/services/roles.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../dto';
import { RegisterUserResponseDTO } from '../responsesDTo';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from 'src/roles/entities/enums/roles.enum';
import { createUserMocked } from './mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let rolesService: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            createUser: jest.fn(),
            findUsers: jest.fn(),
            findUserById: jest.fn(),
            findUserBy: jest.fn(),
          },
        },
        {
          provide: RolesService,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return an id', async () => {
      const createUserDto: CreateUserDTO = createUserMocked;

      const hashedPassword = await bcrypt.hash(createUserDto.password, +process.env.HASH_SALT);
      const result: RegisterUserResponseDTO = await usersService.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', expect.any(Number));
      expect(rolesService.findOneBy).toHaveBeenCalledWith({ key: 'name', value: RolesEnum.REGULAR });
      expect(usersRepository.createUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
        role: { id: '1', name: RolesEnum.REGULAR },
      });
      expect(result).toEqual({ id: '2' });
    });

    it('should throw an error if there is an issue during user creation', async () => {
      const createUserDto: CreateUserDTO = createUserMocked;

      await expect(usersService.create(createUserDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const result = await usersService.findAll();

      expect(usersRepository.findUsers).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Array);
    });

    it('should throw an error if no users are found', async () => {
      await expect(usersService.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should throw an error if no user is found', async () => {
      jest.spyOn(usersRepository, 'findUserById').mockResolvedValue(null);

      await expect(usersService.findOne('1')).rejects.toThrow();
    });
  });

  describe('findBy', () => {
    it('should return a user when given a key and value', async () => {
      const result = await usersService.findBy({ key: 'username', value: 'johndoe' });

      expect(usersRepository.findUserBy).toHaveBeenCalledWith('username', 'johndoe');
      expect(result).toEqual(UserEntity);
    });
  });
});
