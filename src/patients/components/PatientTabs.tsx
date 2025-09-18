import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { PatientDetail } from './PatientDetail';
import { ChevronLeft } from 'lucide-react';
import { AddNewPatient } from './AddNewPatient';

export const PatientTabs = () => {
  const { patientId = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'detail';

  const selectedTab = useMemo(() => {
    const validTabs = ['detail', 'documents', 'schedule'];
    return validTabs.includes(activeTab) ? activeTab : 'detail';
  }, [activeTab]);

  const setTab = (tabName: string) => {
    setSearchParams((prev) => {
      prev.set('tab', tabName);
      return prev;
    });
  };

  return (
    <>
      <div className="flex flex-row items-center gap-4 mb-5">
        <Link to={'/admin/patients'}>
          <ChevronLeft className="hover:scale-150" />
        </Link>
        <h1 className="text-xl font-bold">Patient</h1>
      </div>
      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="detail" onClick={() => setTab('detail')}>
            Detail
          </TabsTrigger>
          <TabsTrigger value="documents" onClick={() => setTab('documents')}>
            Documents
          </TabsTrigger>
          <TabsTrigger value="schedule" onClick={() => setTab('schedule')}>
            Schedule
          </TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
          {/* Show All */}
          <PatientDetail patientId={patientId} />
        </TabsContent>
        <TabsContent value="documents">
          {/* Show Favorites*/}
          <AddNewPatient />
        </TabsContent>
        <TabsContent value="schedule">
          {/* Show Heroes*/}
          {/* {<HeroGrid heroes={heroesResponse?.heroes ?? []} />} */}
        </TabsContent>
      </Tabs>
    </>
  );
};
