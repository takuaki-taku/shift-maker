'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { generateTimeOptions, formatTime } from '@/lib/utils/time';
import { PREFERENCE_LEVELS, PREFERENCE_LEVEL_LABELS } from '@/lib/constants';
import { supabase } from '@/lib/supabase-client';

export default function PreferencesPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [preferenceLevel, setPreferenceLevel] = useState<string>('');
  const { toast } = useToast();

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !startTime || !endTime || !preferenceLevel) {
      toast({
        title: 'エラー',
        description: '全ての項目を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    if (startTime >= endTime) {
      toast({
        title: 'エラー',
        description: '開始時間は終了時間より前である必要があります。',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.from('shift_preferences').insert({
        date: selectedDate.toISOString().split('T')[0],
        start_time: startTime,
        end_time: endTime,
        preference_level: preferenceLevel,
      });

      if (error) throw error;

      toast({
        title: '成功',
        description: 'シフト希望を登録しました。',
      });

      // Reset form
      setSelectedDate(undefined);
      setStartTime('');
      setEndTime('');
      setPreferenceLevel('');
    } catch (error) {
      toast({
        title: 'エラー',
        description: 'シフト希望の登録に失敗しました。',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>シフト希望登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">日付</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">開始時間</label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="開始時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {formatTime(time)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">終了時間</label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="終了時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {formatTime(time)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">希望度</label>
              <Select value={preferenceLevel} onValueChange={setPreferenceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="希望度を選択" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PREFERENCE_LEVEL_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              希望を登録
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}