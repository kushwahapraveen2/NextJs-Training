import { useState } from "react";
import Link from "next/link";
import { Diary } from "../../types";
import Button from "../ui/Button";

interface DiaryCardProps {
  diary: Diary;
}

export default function DiaryCard({ diary }: DiaryCardProps) {
  const [imgError, setImgError] = useState(false);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {imgError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">📷</span>
          </div>
        ) : (
          <img
            src={diary.coverImage || "/placeholder.jpg"}
            alt={diary.title}
            className="w-full h-48 object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              diary.isPublic
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {diary.isPublic ? "🌐 Public" : "🔒 Private"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {diary.title}
        </h3>

        {diary.location && (
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <span className="mr-1">📍</span>
            {diary.location}
          </p>
        )}

        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {truncateText(diary.content, 120)}
        </p>

        <p className="text-xs text-gray-500 mb-4">
          Created on {formatDate(diary.createdAt)}
        </p>

        <div className="flex space-x-2">
          <Link href={`/diary/${diary.id}`} className="flex-1">
            <Button variant="secondary" className="w-full" size="sm">
              👁 View
            </Button>
          </Link>
          <Link href={`/diary/${diary.id}/edit`} className="flex-1">
            <Button variant="ghost" className="w-full" size="sm">
              ✏️ Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
