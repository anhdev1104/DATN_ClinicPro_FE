import { Package } from './Package';

export const AdvisePackage = () => {
  return (
    <>
      <div className="container-page px-4 sm:mx-auto pb-16">
        <h1 className="sm:pb-10 my-10 sm:border-b-2 sm:border-b-[#abdfe1] sm:border-solid text-third text-2xl md:text-3xl font-semibold">
          Khám Sức Khỏe
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-14">
          <Package />
          <Package />
          <Package />
        </div>
      </div>
    </>
  );
};