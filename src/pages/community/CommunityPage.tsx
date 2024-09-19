import Banner from '../community/components/Banner';
import MainPage from './components/Main';
import Amount from './components/Amount';
import Brighten from './components/Brighten';
import InformationSection from './components/Information';
import Campaign from './components/Campaign';
const CommunityPage = () => {
  return (
    <div className="mt-[106px]">
      <Banner />
      <MainPage />
      <Amount />
      <Brighten />
      <InformationSection />
      <Campaign />
    </div>
  );
};

export default CommunityPage;
