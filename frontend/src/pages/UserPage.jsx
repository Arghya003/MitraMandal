
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <div>
      <UserHeader/>
      
      <UserPost likes={1200} replies={481} postImg="/public/Post-1.jpg" postTitle="Im just a baby doggo" date="1d" />
      <UserPost likes={1892} replies={231} postImg="/public/Post-2.jpg" postTitle="Its You And Me" date="3d"/>
      <UserPost likes={1110} replies={876} postImg="/public/Post-3.jpg" postTitle="What every One should have" date="1w" />
      <UserPost likes={700} replies={412}  postTitle="What's Up Bitches?" date="2w"/>
      
    </div>
  )
}

export default UserPage
