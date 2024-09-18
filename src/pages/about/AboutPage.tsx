import Banner from './components/Banner';
import Infomation from './components/Infomation';
import Intro from './components/Intro';
import Story from './components/Story';

const AboutPage = () => {
  return (
    <div className="mt-[106px]">
      <Banner />
      <Intro />
      <Infomation />
      <Story />
    </div>
  );
};

export default AboutPage;
