
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";
import { FolderKanban, Plus, Search, X } from "lucide-react";

interface DashboardHeaderProps {
  user: { username?: string; email?: string };
  searchTerm: string;
  totalProjects: number;
  onSearch: (term: string) => void;
  onClearSearch: () => void;
  onCreateProject: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  searchTerm,
  totalProjects,
  onSearch,
  onClearSearch,
  onCreateProject,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div className="relative flex-1 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg">
              <FolderKanban className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              {t("nav.welcome", { name: user?.username || user?.email })}
            </h1>
          </div>

          {/* Search Input */}
          <div className="relative group">
            <SearchInput
              value={searchTerm}
              onChange={onSearch}
              placeholder="Search projects by title or description..."
              className="w-full"
            />

            {/* Search tips */}
            {!searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Press Enter or click outside to search • Clear with X button
                </p>
              </div>
            )}
          </div>

          {/* Search stats */}
          {searchTerm && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm">
                <Search className="h-3.5 w-3.5" />
                <span>
                  Found {totalProjects} project
                  {totalProjects !== 1 ? "s" : ""} matching "{searchTerm}"
                </span>
              </div>
              <button
                onClick={onClearSearch}
                className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors text-sm"
              >
                <X className="h-3.5 w-3.5" />
                Clear search
              </button>
            </div>
          )}
        </div>

        <Button
          onClick={onCreateProject}
          className="flex items-center gap-3 shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 whitespace-nowrap"
        >
          <Plus size={20} />
          <span className="font-medium">{t("project.create")}</span>
        </Button>
      </div>
    </div>
  );
};
