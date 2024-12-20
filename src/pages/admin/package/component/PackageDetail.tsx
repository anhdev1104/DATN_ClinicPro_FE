import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DirectRoute from '@/components/direct';
import { getPackageById } from '@/services/package.service';
import { toast } from 'react-toastify';
import { IPackage } from '@/types/package.type';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [packageDetail, setPackageDetail] = useState<IPackage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) {
        setError('Invalid package ID.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      console.log(`Fetching package with ID: ${id}`);
      try {
        const response = await getPackageById(id);
        if (response && response.data) {
          console.log(response);
          setPackageDetail(response.data);
        } else {
          setError('Package data not found.');
        }
      } catch (error: any) {
        console.error('Error fetching package:', error);
        setError('Không thể tải dữ liệu gói khám');
        toast.error('Không thể tải dữ liệu gói khám');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);
  if (loading || error) {
    return <div>{loading ? 'Đang tải dữ liệu...' : 'Không thể lấy dữ liệu'}</div>;
  }

  return (
    <section className="package">
      <DirectRoute nav="Quản lý gói khám" subnav="Chi tiết gói khám" />
      <div className="bg-white rounded-2xl p-6">
        {packageDetail ? (
          <>
            <h1 className="text-lg font-semibold mb-4">{packageDetail.name}</h1>
            <div className="mb-4">
              <strong>Mô tả:</strong>
              <p>{packageDetail.description}</p>
            </div>
            <div className="mb-4">
              <strong>Nội dung:</strong>
              <textarea
                name="content"
                rows={6}
                disabled
                className="w-full p-2 border rounded"
                value={packageDetail.content}
              />
            </div>
            <div className="profile-image mb-4">
              <strong>Hình ảnh:</strong>
              <img src={packageDetail.image} alt={packageDetail.name} className="w-full h-64 object-cover rounded" />
            </div>
          </>
        ) : (
          <div>Không tìm thấy dữ liệu cho gói khám này.</div>
        )}
      </div>
    </section>
  );
};

export default PackageDetail;
