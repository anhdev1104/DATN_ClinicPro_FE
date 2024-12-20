import { ChevronRightIcon } from '../icons';

type TDirectRoute = { nav: string; subnav: string; targetnav?: string };

const DirectRoute = ({ nav, subnav, targetnav }: TDirectRoute) => {
  return (
    <div className="text-primaryAdmin flex items-center text-base mb-10">
      <h2>{nav}</h2>
      <ChevronRightIcon fontSize="small" className="mx-2" />
      <span className={targetnav ? 'text-primaryAdmin' : 'text-primaryAdmin/60'}>{subnav}</span>
      {targetnav && (
        <>
          <ChevronRightIcon fontSize="small" className="mx-2" />
          <span className="text-primaryAdmin/60">{targetnav}</span>
        </>
      )}
    </div>
  );
};

export default DirectRoute;
