import React, { useState, useEffect, useCallback } from 'react';
import { PartialPrdResponse, PrdResponse } from '../types';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { generateInitialPrd, generatePrdDetails } from '../services/groqService';
import { getPrdForViewing } from '../services/storageService';

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<string>('');
  const [prd, setPrd] = useState<PartialPrdResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a PRD to view from the history page
    const prdToView = getPrdForViewing();
    if (prdToView) {
      setPrd(prdToView);
      setNotes(''); // Clear notes as we are viewing a saved PRD
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!notes.trim() || isLoading) return;

    setIsLoading(true);
    setIsEnhancing(false);
    setError(null);
    setPrd(null);

    try {
      // Step 1: Get the essential PRD content quickly
      const initialResult = await generateInitialPrd(notes);
      setPrd(initialResult);
      setIsLoading(false); // Initial loading is complete
      setIsEnhancing(true); // Start fetching details in the background

      // Step 2: Asynchronously get the remaining details
      const detailsResult = await generatePrdDetails(notes, initialResult.prd_markdown);
      
      // Step 3: Merge the details into the existing PRD state
      setPrd(currentPrd => ({ ...currentPrd, ...detailsResult } as PrdResponse));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
      setIsLoading(false);
    } finally {
      setIsEnhancing(false);
    }
  }, [notes, isLoading]);

  const handleEdit = useCallback((newMarkdown: string) => {
    if (prd) {
      setPrd({ ...prd, prd_markdown: newMarkdown });
    }
  }, [prd]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="lg:w-1/3 flex-shrink-0">
          <Editor
            notes={notes}
            setNotes={setNotes}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-2/3 flex-grow">
          <Preview prd={prd} isLoading={isLoading} isEnhancing={isEnhancing} error={error} onEdit={handleEdit} />
        </div>
      </div>

    </>
  );
};

export default HomePage;
