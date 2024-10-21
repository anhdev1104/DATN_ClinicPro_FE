import { ChevronRightIcon } from '../icons';

const DirectRoute = ({ nav, subnav, targetnav }: { nav: string; subnav: string; targetnav?: string }) => {
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
