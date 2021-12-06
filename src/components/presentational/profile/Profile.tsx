import classes from './Profile.module.scss';

interface Props {
  name: string;
  imageUrl: string;
}
export const Profile = ({ name, imageUrl }: Props) => {
  return (
    <div className={classes.body}>
      <img alt="profile picture" src={imageUrl} />
      <div>{name}</div>
    </div>
  );
};
