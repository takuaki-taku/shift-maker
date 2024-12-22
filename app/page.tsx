import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ClipboardList, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">部活動指導者シフト管理システム</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                シフト希望登録
              </CardTitle>
              <CardDescription>
                指導可能な日時を登録します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/preferences">
                <Button className="w-full">
                  希望を登録する
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                シフト管理
              </CardTitle>
              <CardDescription>
                シフトの作成と確認を行います
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/shifts">
                <Button className="w-full">
                  シフトを管理する
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                指導者管理
              </CardTitle>
              <CardDescription>
                指導者情報を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/instructors">
                <Button className="w-full">
                  指導者を管理する
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}