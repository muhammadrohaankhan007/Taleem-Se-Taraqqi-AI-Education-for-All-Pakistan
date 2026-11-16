import 'package:flutter/material.dart';

class TracingCanvas extends StatefulWidget {
  final String letter;
  final String hint;
  final VoidCallback onCompleted;

  const TracingCanvas({
    super.key,
    required this.letter,
    required this.hint,
    required this.onCompleted,
  });

  @override
  State<TracingCanvas> createState() => _TracingCanvasState();
}

class _TracingCanvasState extends State<TracingCanvas> {
  final List<List<Offset>> _strokes = [];
  bool _hasTraced = false;

  void _clearCanvas() {
    setState(() {
      _strokes.clear();
      _hasTraced = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Tracing Area
        Container(
          height: 260,
          margin: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            color: const Color(0xFFFFFDE7), // soft parchment yellow
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: const Color(0xFFFFD54F), width: 2),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.04),
                blurRadius: 8,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Background Guide Character (Dotted / Light grey guide)
              Text(
                widget.letter,
                style: TextStyle(
                  fontFamily: 'NotoNaskhArabic',
                  fontSize: 160,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade300,
                ),
              ),

              // Drawing Surface
              GestureDetector(
                onPanStart: (details) {
                  setState(() {
                    _strokes.add([details.localPosition]);
                    _hasTraced = true;
                  });
                },
                onPanUpdate: (details) {
                  setState(() {
                    if (_strokes.isNotEmpty) {
                      _strokes.last.add(details.localPosition);
                    }
                  });
                },
                child: CustomPaint(
                  painter: _StrokePainter(strokes: _strokes),
                  size: Size.infinite,
                ),
              ),

              // Clear button
              Positioned(
                top: 8,
                right: 8,
                child: IconButton.filledTonal(
                  icon: const Icon(Icons.refresh, size: 20),
                  tooltip: 'Clear / دوبارہ لکھیں',
                  onPressed: _clearCanvas,
                ),
              ),

              // Hint badge
              Positioned(
                bottom: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    widget.hint,
                    style: const TextStyle(color: Colors.white, fontSize: 12),
                  ),
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 12),

        // Action Buttons
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            children: [
              OutlinedButton.icon(
                icon: const Icon(Icons.refresh),
                label: const Text('دوبارہ (Clear)'),
                onPressed: _clearCanvas,
              ),
              const Spacer(),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: _hasTraced ? const Color(0xFF2E7D32) : Colors.grey,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: const Icon(Icons.check_circle),
                label: const Text('مکمل ہو گیا (Done)'),
                onPressed: _hasTraced ? widget.onCompleted : null,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _StrokePainter extends CustomPainter {
  final List<List<Offset>> strokes;

  _StrokePainter({required this.strokes});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF1565C0) // Deep blue ink
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..strokeWidth = 14.0
      ..style = PaintingStyle.stroke;

    for (final stroke in strokes) {
      if (stroke.length > 1) {
        final path = Path();
        path.moveTo(stroke.first.dx, stroke.first.dy);
        for (int i = 1; i < stroke.length; i++) {
          path.lineTo(stroke[i].dx, stroke[i].dy);
        }
        canvas.drawPath(path, paint);
      } else if (stroke.length == 1) {
        canvas.drawCircle(stroke.first, 7.0, paint..style = PaintingStyle.fill);
        paint.style = PaintingStyle.stroke;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _StrokePainter oldDelegate) => true;
}
