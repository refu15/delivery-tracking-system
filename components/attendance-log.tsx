import { Badge } from "@/components/ui/badge"

type AttendanceRecord = {
  id: number
  date: string
  clockIn: string
  clockOut: string
  workHours: string
  status: "normal" | "late" | "early_leave" | "absent"
  note?: string
}

// モックデータ
const generateMockData = (baseDate: Date): AttendanceRecord[] => {
  const records: AttendanceRecord[] = []
  const currentDate = new Date(baseDate)

  // 過去7日間のデータを生成
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate)
    day.setDate(currentDate.getDate() - i)

    // 土日はスキップ
    if (day.getDay() === 0 || day.getDay() === 6) {
      continue
    }

    const dateStr = day.toISOString().split("T")[0]

    // ランダムなステータス
    const statuses: ("normal" | "late" | "early_leave" | "absent")[] = ["normal", "late", "early_leave", "absent"]
    const randomStatus = statuses[Math.floor(Math.random() * 4)]

    let clockIn = "08:00"
    let clockOut = "17:00"
    let workHours = "8:00"
    let note

    if (randomStatus === "late") {
      clockIn = "08:15"
      workHours = "7:45"
      note = "電車遅延"
    } else if (randomStatus === "early_leave") {
      clockOut = "16:00"
      workHours = "7:00"
      note = "体調不良"
    } else if (randomStatus === "absent") {
      clockIn = "--:--"
      clockOut = "--:--"
      workHours = "--:--"
      note = "休暇"
    }

    records.push({
      id: i,
      date: dateStr,
      clockIn,
      clockOut,
      workHours,
      status: randomStatus,
      note,
    })
  }

  return records
}

const getStatusBadge = (status: "normal" | "late" | "early_leave" | "absent") => {
  switch (status) {
    case "normal":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          正常
        </Badge>
      )
    case "late":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          遅刻
        </Badge>
      )
    case "early_leave":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          早退
        </Badge>
      )
    case "absent":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          欠勤
        </Badge>
      )
    default:
      return <Badge variant="outline">不明</Badge>
  }
}

export function AttendanceLog({ date }: { date: Date }) {
  const records = generateMockData(date)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left font-medium">日付</th>
            <th className="py-2 px-4 text-left font-medium">出勤</th>
            <th className="py-2 px-4 text-left font-medium">退勤</th>
            <th className="py-2 px-4 text-left font-medium">勤務時間</th>
            <th className="py-2 px-4 text-left font-medium">状態</th>
            <th className="py-2 px-4 text-left font-medium">備考</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="py-2 px-4">{record.date}</td>
              <td className="py-2 px-4">{record.clockIn}</td>
              <td className="py-2 px-4">{record.clockOut}</td>
              <td className="py-2 px-4">{record.workHours}</td>
              <td className="py-2 px-4">{getStatusBadge(record.status)}</td>
              <td className="py-2 px-4 text-muted-foreground">{record.note || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

