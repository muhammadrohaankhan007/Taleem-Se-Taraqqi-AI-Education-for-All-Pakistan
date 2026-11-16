import 'dart:convert';

class LearnerProfile {
  final String id;
  final String name;
  final String avatar;
  final String ageGroup;
  final String literacyLevel;
  final String suggestedPathway;
  final List<String> picturePin; // 4-symbol picture PIN (e.g. ['🌟', '🌙', '🦁', '🍎'])
  final int progressStars;

  const LearnerProfile({
    required this.id,
    required this.name,
    required this.avatar,
    required this.ageGroup,
    this.literacyLevel = 'Level 0: Beginner',
    this.suggestedPathway = 'Foundation Literacy',
    this.picturePin = const ['🌟', '🌙', '🦁', '🍎'],
    this.progressStars = 0,
  });

  LearnerProfile copyWith({
    String? id,
    String? name,
    String? avatar,
    String? ageGroup,
    String? literacyLevel,
    String? suggestedPathway,
    List<String>? picturePin,
    int? progressStars,
  }) {
    return LearnerProfile(
      id: id ?? this.id,
      name: name ?? this.name,
      avatar: avatar ?? this.avatar,
      ageGroup: ageGroup ?? this.ageGroup,
      literacyLevel: literacyLevel ?? this.literacyLevel,
      suggestedPathway: suggestedPathway ?? this.suggestedPathway,
      picturePin: picturePin ?? this.picturePin,
      progressStars: progressStars ?? this.progressStars,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'avatar': avatar,
      'ageGroup': ageGroup,
      'literacyLevel': literacyLevel,
      'suggestedPathway': suggestedPathway,
      'picturePin': picturePin,
      'progressStars': progressStars,
    };
  }

  factory LearnerProfile.fromMap(Map<String, dynamic> map) {
    return LearnerProfile(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      avatar: map['avatar'] ?? '👦',
      ageGroup: map['ageGroup'] ?? 'child',
      literacyLevel: map['literacyLevel'] ?? 'Level 0: Beginner',
      suggestedPathway: map['suggestedPathway'] ?? 'Foundation Literacy',
      picturePin: List<String>.from(map['picturePin'] ?? ['🌟', '🌙', '🦁', '🍎']),
      progressStars: map['progressStars'] ?? 0,
    );
  }

  String toJson() => json.encode(toMap());

  factory LearnerProfile.fromJson(String source) =>
      LearnerProfile.fromMap(json.decode(source));
}
