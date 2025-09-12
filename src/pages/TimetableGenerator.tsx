import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TimetableGrid } from '@/components/timetable/TimetableGrid';
import { 
  Settings, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Download,
  Eye,
  Clock
} from 'lucide-react';

export default function TimetableGenerator() {
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedTimetables, setGeneratedTimetables] = useState<any[]>([]);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [maxClassesPerDay, setMaxClassesPerDay] = useState('6');
  const [includeLabSessions, setIncludeLabSessions] = useState(true);
  const { toast } = useToast();

  const generationSteps = [
    'Analyzing constraints...',
    'Checking faculty availability...',
    'Optimizing classroom allocation...',
    'Resolving conflicts...',
    'Finalizing timetable...'
  ];

  const batches = [
    { id: 'batch1', name: 'CS-3A', semester: 5 },
    { id: 'batch2', name: 'CS-3B', semester: 5 },
    { id: 'batch3', name: 'CS-4A', semester: 7 }
  ];

  const handleGenerate = async () => {
    if (selectedBatches.length === 0) {
      toast({
        title: 'Selection Required',
        description: 'Please select at least one batch to generate timetable for.',
        variant: 'destructive'
      });
      return;
    }

    setGenerating(true);
    setGenerationStep(0);
    setGeneratedTimetables([]);

    // Simulate generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Simulate generated results
    const mockResults = [
      {
        id: 1,
        name: 'Option 1 - Optimal',
        score: 95,
        conflicts: 0,
        utilization: 88,
        status: 'optimal'
      },
      {
        id: 2,
        name: 'Option 2 - Balanced',
        score: 87,
        conflicts: 2,
        utilization: 82,
        status: 'good'
      },
      {
        id: 3,
        name: 'Option 3 - Alternative',
        score: 78,
        conflicts: 4,
        utilization: 75,
        status: 'acceptable'
      }
    ];

    setGeneratedTimetables(mockResults);
    setGenerating(false);

    toast({
      title: 'Timetable Generated Successfully',
      description: `Generated ${mockResults.length} timetable options with minimal conflicts.`
    });
  };

  const handleSelectOption = (optionId: number) => {
    toast({
      title: 'Timetable Selected',
      description: `Option ${optionId} has been selected for further review.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-lg p-6 border shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 rounded-full p-3">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Timetable Generator</h1>
            <p className="text-muted-foreground">
              Generate optimized, conflict-free timetables automatically
            </p>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Generation Settings</span>
          </CardTitle>
          <CardDescription>
            Configure parameters for timetable generation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Batch Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Batches</Label>
              <div className="space-y-2">
                {batches.map((batch) => (
                  <div key={batch.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={batch.id}
                      checked={selectedBatches.includes(batch.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBatches([...selectedBatches, batch.id]);
                        } else {
                          setSelectedBatches(selectedBatches.filter(id => id !== batch.id));
                        }
                      }}
                    />
                    <Label htmlFor={batch.id} className="flex-1">
                      {batch.name} - Semester {batch.semester}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxClasses">Max Classes Per Day</Label>
                <Select value={maxClassesPerDay} onValueChange={setMaxClassesPerDay}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Classes</SelectItem>
                    <SelectItem value="5">5 Classes</SelectItem>
                    <SelectItem value="6">6 Classes</SelectItem>
                    <SelectItem value="7">7 Classes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeLabSessions"
                  checked={includeLabSessions}
                  onCheckedChange={(checked) => setIncludeLabSessions(checked as boolean)}
                />
                <Label htmlFor="includeLabSessions">
                  Include Lab Sessions
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button 
              onClick={handleGenerate} 
              disabled={generating}
              size="lg"
              className="w-full md:w-auto"
            >
              {generating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Timetable
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {generating && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Generation in Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={((generationStep + 1) / generationSteps.length) * 100} />
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-primary animate-spin" />
              <span>{generationSteps[generationStep]}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Options */}
      {generatedTimetables.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Generated Options</CardTitle>
            <CardDescription>
              Choose the best timetable option for your requirements
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {generatedTimetables.map((option) => (
                <Card key={option.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{option.name}</CardTitle>
                      <Badge 
                        variant={
                          option.status === 'optimal' ? 'default' :
                          option.status === 'good' ? 'secondary' :
                          'outline'
                        }
                        className={
                          option.status === 'optimal' ? 'bg-success text-success-foreground' :
                          option.status === 'good' ? 'bg-primary text-primary-foreground' :
                          ''
                        }
                      >
                        {option.status === 'optimal' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {option.status !== 'optimal' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {option.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Optimization Score</span>
                        <span className="font-medium">{option.score}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conflicts</span>
                        <span className={`font-medium ${option.conflicts === 0 ? 'text-success' : 'text-warning'}`}>
                          {option.conflicts}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilization</span>
                        <span className="font-medium">{option.utilization}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleSelectOption(option.id)}
                        className="w-full"
                        variant={option.status === 'optimal' ? 'default' : 'outline'}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Select This Option
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Section */}
      {generatedTimetables.length > 0 && (
        <div>
          <TimetableGrid 
            title="Preview - Generated Timetable (Option 1)"
            editable={false}
          />
        </div>
      )}
    </div>
  );
}