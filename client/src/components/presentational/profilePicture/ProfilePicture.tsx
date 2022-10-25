import classes from './Google.module.scss';

interface Props {
  name: string;
  imageUrl: string;
}
export const ProfilePicture = ({ name, imageUrl }: Props) => {
  return (
    <div className={classes.body}>
      <img alt="profile picture" src={imageUrl} />
      <div>{name}</div>
    </div>
  );
};
