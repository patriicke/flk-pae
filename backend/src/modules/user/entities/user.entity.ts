import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';
import { IsEmail, Max, Min } from 'class-validator';
import { EUserRoleType } from '~/shared/enums/EUserType';
import * as bcrypt from 'bcryptjs';
import { EUserStatusType } from '~/shared/enums/EUserStatusType';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ example: 'John' })
  @Column({
    type: 'varchar',
    nullable: false
  })
    first_name: string;

  @ApiProperty({ example: 'Doe' })
  @Column({
    type: 'varchar',
    nullable: false
  })
    last_name: string;

  @ApiProperty({ example: '+250788888888' })
  @Column({
    type: 'varchar',
    nullable: false
  })
    phone_number: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @Column({
    type: 'varchar',
    nullable: false
  })
  @IsEmail()
    email: string;

  @ApiProperty({ example: 'Rwanda' })
  @Column({
    type: 'varchar',
    nullable: false
  })
  @IsEmail()
    country: string;

  @ApiProperty({ example: 'Kigali' })
  @Column({
    type: 'varchar',
    nullable: false
  })
  @IsEmail()
    region: string;

  @ApiProperty({ example: 'password' })
  @Column({
    type: 'varchar',
    nullable: false,
    select: false
  })
  @Min(6)
  @Max(16)
    password: string;

  @ApiProperty({ example: 'active' })
  @Column({
    type: 'varchar',
    nullable: true,
    default: EUserStatusType.ACTIVE
  })
    status: EUserStatusType;

  @ApiProperty({ example: 'member' })
  @Column('varchar', {
    nullable: false,
    default: EUserRoleType.MEMBER
  })
    role: EUserRoleType;

  @ApiProperty({ example: '2000-05-10' })
  @Column('date', {
    nullable: false
  })
    dob: string;

  @ApiProperty({ example: 'true' })
  @Column('boolean', {
    default: false,
    nullable: false
  })
    is_verified: string;

  @ApiProperty({ example: 'https://photos.choose' })
  @Column({
    type: 'varchar',
    nullable: true,
    default: 'https://photos.choose'
  })
    profile_picture: string;

  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() updated_at: Date;

  @Column({ default: true })
    is_active: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validate_password(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
